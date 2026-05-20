const mongoose = require('mongoose');

// 1. الاتصال بقاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/food-project-db')
    .then(() => console.log('⏳ Creating Your Final Project Data...'))
    .catch((err) => console.log('❌ DB Error:', err));

// 2. الموديل
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

// 3. الداتا
const finalData = require('./meals.json');

// 4. تنظيف + إصلاح ObjectId
const cleanData = finalData.map(item => {

    // تحويل _id من {$oid} إلى ObjectId بدل الحذف
    if (item._id?.$oid) {
        item._id = new mongoose.Types.ObjectId(item._id.$oid);
    }

    // تنظيف sizes ids
    if (item.sizes && Array.isArray(item.sizes)) {
        item.sizes = item.sizes.map(size => {
            if (size._id?.$oid) {
                size._id = new mongoose.Types.ObjectId(size._id.$oid);
            }
            return size;
        });
    }

    return item;
});

// 5. دالة التنفيذ
async function seedDatabase() {
    try {
        await Meal.deleteMany({}); // تنظيف القديم

        const result = await Meal.insertMany(cleanData, { ordered: false });

        console.log(`✅ Done! Inserted: ${result.length} meals`);
        console.log(`🎯 AI + Menu system fully working 🚀`);

        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

seedDatabase();
