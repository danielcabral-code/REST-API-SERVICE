const mongoose = require("mongoose");

const defaultPlanSchema = new mongoose.Schema({
  id: String,
  max_age: Number,
  exercise_id:[String]
});

const default_plans = mongoose.model("tbl_default_plans", defaultPlanSchema);

module.exports = default_plans;