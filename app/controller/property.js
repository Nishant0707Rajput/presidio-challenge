const Property = require('../model/property');
const User = require('../model/user');

exports.createProperty = async (req, res) => {
    try {
        const saveData = { ...req.body, seller: req.data.userId };
        const checkPIC = await Property.findOne({ propertyIdentificationCode: saveData.propertyIdentificationCode })
        if (checkPIC) {
            return res.status(409).json({ data: checkPIC, message: 'Property already exist' });
        }
        const property = await Property.create(saveData);
        return res.status(201).json({ data: property, message: 'Property created successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Error occurred on server' });
    }
};

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        return res.status(200).json({ data: properties });
    } catch (err) {
        return res.status(500).json({ error: 'Error occurred on server' });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        return res.status(200).json({ data: property });
    } catch (err) {
        return res.status(500).json({ error: 'Error occurred on server' });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        return res.status(200).json({ data: property, message: 'Property updated successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Error occurred on server' });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Error occurred on server' });
    }
};

exports.getSellerDetails = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        return res.status(200).json({data});
    } catch (err) {
        return res.status(500).json({ error: 'Error occurred on server' });
    }
};
