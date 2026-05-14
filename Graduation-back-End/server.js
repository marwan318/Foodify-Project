const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/food-project-db')
    .then(() => console.log('✅ MongoDB Connected!'))
    .catch(err => console.log('❌ DB Error:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

const Meal = mongoose.model('Meal', new mongoose.Schema({
    name: String, price: Number, image: String, category: String,
    ingredients: [String], allergens: [String], isFeatured: Boolean
}));

app.get('/api/meals', async (req, res) => {
    res.json(await Meal.find({}));
});

app.post('/api/add-meal', async (req, res) => {
    try {
        const newMeal = new Meal(req.body);
        await newMeal.save();
        res.status(201).json({ message: "Meal Added" });
    } catch (e) { res.status(400).json({ message: "Error" }); }
});

app.post('/api/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "Success" });
    } catch (e) { res.status(400).json({ message: "Email Exists" }); }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) res.status(200).json({ message: "Login successful", username: user.username });
    else res.status(401).json({ message: "Invalid credentials" });
});

app.listen(3000, () => console.log('🚀 Server running on port 3000'));