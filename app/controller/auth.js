const User = require('../model/user');
const Session = require('../model/session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, userType, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{ email: email }, { phone: phone }]
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with the same email or phone number already exists'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            phone,
            userType,
            password,
            password: hashedPassword
        });
        if(!newUser){
            throw new Error();
        }
        return res.status(201).json({data:newUser,message:"User created successfully"})
    } catch (err) {
        return res.status(500).json({ error: "Error occrured on server" }); I
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = jwt.sign(
            { userId: existingUser._id, userType: existingUser.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        await Session.deleteMany({ userId: existingUser._id });
        const session = new Session({ userId: existingUser._id, token });
        await session.save();
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: existingUser._id,
                userType: existingUser.userType,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                phone: existingUser.phone
            }
        });
    } catch (err) {
        return res.status(500).json({ error: "Error occrured on server" }); I
    }
}
