const InteriorService = require("../models/InteriorService");

const addInteriorService = async (req, res) => {
  try {
    const service = await InteriorService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInteriorServices = async (req, res) => {
  try {
    const services = await InteriorService.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInteriorServiceById = async (req, res) => {
  try {
    const service = await InteriorService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Interior service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(404).json({ message: "Interior service not found" });
  }
};

const updateInteriorService = async (req, res) => {
  try {
    const updated = await InteriorService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Interior service not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInteriorService = async (req, res) => {
  try {
    const deleted = await InteriorService.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Interior service not found" });
    }

    res.json({ message: "Interior service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addInteriorService,
  getInteriorServices,
  getInteriorServiceById,
  updateInteriorService,
  deleteInteriorService,
};
