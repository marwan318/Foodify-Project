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
const finalData = [
    // 🍕 PIZZA
    { 
        name: "Ranch Chicken Pizza", category: "Pizza", isFeatured: true, price: 140, 
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        ingredients: ["Chicken", "Ranch", "Mozzarella"], allergens: ["Gluten", "Milk"],
        sizes: [ { name: "Small", price: 140 }, { name: "Large", price: 200 } ]
    },
    { 
        name: "Classic Pepperoni", category: "Pizza", isFeatured: false, price: 120, 
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
        ingredients: ["Pepperoni", "Tomato Sauce", "Cheese"], allergens: ["Gluten", "Milk"],
        sizes: [ { name: "Small", price: 120 }, { name: "Large", price: 180 } ]
    },

    // 🍔 BURGERS
    { 
        name: "Double Smash Burger", category: "Burger", isFeatured: true, price: 150, 
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        ingredients: ["2 Beef Patties", "Cheddar", "Onions", "Sauce"], allergens: ["Gluten", "Milk"],
        sizes: [ { name: "Double", price: 150 }, { name: "Triple", price: 190 } ]
    },
    { 
        name: "Crispy Chicken Burger", category: "Burger", isFeatured: false, price: 110, 
        image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=500",
        ingredients: ["Fried Chicken", "Lettuce", "Mayo"], allergens: ["Gluten", "Eggs"],
        sizes: [ { name: "Regular", price: 110 }, { name: "Spicy", price: 120 } ]
    },

    // 🥗 SALADS
    { 
        name: "Grilled Chicken Salad", category: "Salad", isFeatured: true, price: 90, 
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500",
        ingredients: ["Lettuce", "Grilled Chicken", "Parmesan"], allergens: ["Milk"],
        sizes: [] // السلطة ملهاش أحجام
    },
    { 
        name: "Greek Salad", category: "Salad", isFeatured: false, price: 75, 
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
        ingredients: ["Tomatoes", "Cucumbers", "Feta Cheese", "Olives"], allergens: ["Milk"],
        sizes: [] 
    },

    // 🥤 DRINKS
    { 
        name: "Iced Spanish Latte", category: "Drinks", isFeatured: true, price: 75, 
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500",
        ingredients: ["Espresso", "Milk", "Ice"], allergens: ["Milk"],
        sizes: [] 
    },
    { 
        name: "Fresh Orange Juice", category: "Drinks", isFeatured: false, price: 45, 
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
        ingredients: ["Fresh Oranges", "Sugar"], allergens: [],
        sizes: [] 
    },

    // 🍗 FRIED CHICKEN
    { 
        name: "Spicy Broasted Meal", category: "Fried Chicken", isFeatured: true, price: 160, 
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500",
        ingredients: ["4 Chicken Pieces", "Fries", "Garlic Dip"], allergens: ["Gluten"],
        sizes: [] 
    },

    // 🍰 DESSERT
    { 
        name: "Lotus Cheesecake", category: "Dessert", isFeatured: true, price: 85, 
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
        ingredients: ["Cream Cheese", "Lotus Biscuits", "Sugar"], allergens: ["Gluten", "Milk"],
        sizes: [] 
    }
];

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