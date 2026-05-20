const mongoose = require('mongoose');

// 1. الاتصال بقاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/food-project-db')
    .then(() => console.log('⏳ Creating Your Final Project Data...'))
    .catch((err) => console.log('❌ DB Error:', err));

// 2. القالب النهائي المظبوط
const Meal = mongoose.model('Meal', new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    category: String,
    isFeatured: { type: Boolean, default: false }, 
    ingredients: [String],
    allergens: [String],
    sizes: [{ name: String, price: Number }]
}));

// 3. الداتا الجاهزة (صور حقيقية، أحجام صح، وكل حاجة متظبطة)
const finalData = require('.\meals.json')
// 4. دالة التنفيذ
async function seedDatabase() {
    try {
        await Meal.deleteMany({}); // تنظيف القديم
        await Meal.insertMany(finalData); // إضافة الجديد
        console.log(`✅ Done! Your project is 100% Ready for presentation.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

seedDatabase();
