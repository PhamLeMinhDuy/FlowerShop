require('../utils/MongooseUtil');
const Models = require('./Models');

const PlantDAO = {
  async selectByCount() {
    const query = {};
    const noPlants = await Models.Plant.find(query).count().exec();
    return noPlants;
  },
  async selectBySkipLimit(skip, limit) {
    const query = {};
    const plants = await Models.Plant.find(query).skip(skip).limit(limit).exec();
    return plants;
  },
  async insert(plant) {
    const mongoose = require('mongoose');
    plant._id = new mongoose.Types.ObjectId();
    const result = await Models.Plant.create(plant);
    return result;
  },
  async selectByID(_id) {
    const plant = await Models.Plant.findById(_id).exec();
    return plant;
  },
  async update(plant) {
    const newvalues = { name: plant.name, price: plant.price, image: plant.image, category: plant.category };
    const result = await Models.Plant.findByIdAndUpdate(plant._id, newvalues, { new: true });
    return result;
  },
  async delete(_id) {
    const result = await Models.Plant.findByIdAndRemove(_id);
    return result;
  },
  async selectByID(_id) {
    const plant = await Models.Plant.findById(_id).exec();
    return plant;
  },
  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 };
    const plants = await Models.Plant.find(query).sort(mysort).limit(top).exec();
    return plants;
  },
  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.plant._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } }, 
      { $limit: top }
    ]).exec();
    var plants = [];
    for (const item of items) {
      const plant = await PlantDAO.selectByID(item._id);
      plants.push(plant);
    }
    return plants;
  },
  async selectTopHotOfCat(category) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.plant._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } }, 
    ]).exec();
    var plants = [];
    for (const item of items) {
      const plant = await PlantDAO.selectByID(item._id);
      if (plant.category.name === category && plants.length < 3){
        plants.push(plant);
      }
    }
    return plants;
  },
  async selectByCatID(_cid) {
    const query = { 'category._id': _cid };
    const plants = await Models.Plant.find(query).exec();
    return plants;
  },
  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const plants = await Models.Plant.find(query).exec();
    return plants;
  },
};
module.exports = PlantDAO;