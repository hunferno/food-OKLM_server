import foodSchema from "../models/foodSchema.js";

// Méthode pour obtenir toutes les foods
export const getFoods = async (req, res) => {
  try {
    const foods = await foodSchema.find();

    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Méthode pour obtenir une seule food (:id)
export const getFood = async (req, res) => {
  try {
    const food = await foodSchema.findById(req.params.id);

    res.status(200).json(food);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Méthode pour créer une food
export const createFood = async (req, res) => {
  const food = req.body;
  
  try {
    const newFood = await foodSchema.create(food);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Méthode pour modifier une food (:id)
export const updateFood = async (req, res) => {
  const updatedInfo = req.body;

  try {
    const updatedFood = await foodSchema.findOneAndUpdate(
      { _id: req.params.id },
      updatedInfo,
      { new: true }
    );

    res.status(201).json(updatedFood);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Méthode pour supprimer une food (:id)
export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await foodSchema.findByIdAndDelete(req.params.id);

    res
      .status(204)
      .json({ message: `Food with id : ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
