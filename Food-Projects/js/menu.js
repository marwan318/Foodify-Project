// 1. حماية الصفحة
(function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert("Please login first! 😊");
        window.location.href = 'pages/login.html';
    }
})();

// 🧠 عقل الذكاء الاصطناعي - مربوط بالـ IDs اللي بعتها
const aiRecommendations = {
    "69ee44415225df36c8f3ea72": ["6a0201614ff0d683da734614"], // Ranch Pizza -> Sauce ranch
    "69ee44415225df36c8f3ea78": ["6a01e8696d26cb1f959dfad8"], 
    "6a01d9556d26cb1f959dfad3": ["6a01e8696d26cb1f959dfad8"], 
   
    "6a01c4bd6d26cb1f959dfac0": ["6a01e5336d26cb1f959dfad5"], //  -> fries
    "6a01fb2a4ff0d683da73460a": ["6a01e8696d26cb1f959dfad8"], //  -> fries,pepsi
    "69ee44415225df36c8f3ea83": ["6a01e8696d26cb1f959dfad8"], //  ->Lotus Cheesecake,Iced Spanish Latte
    "6a01d8386d26cb1f959dfad2": ["6a01e95e6d26cb1f959dfadb"], //  ->Brownies,Iced Caramel Macchiato
    "6a00d2d16d26cb1f959dfabe": ["6a01c5286d26cb1f959dfac1"], //  ->BBQ Chicken Pizza,Caesar Salad
    "6a00d3076d26cb1f959dfabf": ["69ee44415225df36c8f3ea7f"], //  ->Margherita Pizza,Greek Salad
   
    "6a01d1086d26cb1f959dfac6": ["6a01e8696d26cb1f959dfada"], //  ->Veggie Pizza,Ice Cold Cola
    "6a01d98f6d26cb1f959dfad4": ["6a01fbd14ff0d683da73460c"], //  ->Family Bucket,Mozzarella Sticks
    "6a01c6316d26cb1f959dfac4": ["6a01fb2a4ff0d683da73460a"], //  ->Crispy Fried Chicken,Cheesy Fries
    "6a01c4bd6d26cb1f959dfac0": ["6a01e77a6d26cb1f959dfad7"], //  ->Classic Beef Burger,Loaded Fries
    "69ee44415225df36c8f3ea7b": ["6a01fbd14ff0d683da73460c"], //  ->Mushroom Swiss Burger,Mozzarella Sticks
    "69ee44415225df36c8f3ea75": ["69ee44415225df36c8f3ea7e"], //  ->Classic Pepperoni,Grilled Chicken Salad
    "6a01d1f76d26cb1f959dfac7": ["6a01c58c6d26cb1f959dfac2"], //  ->Meat Lovers Pizza,Mango Smoothie
    "6a01d9556d26cb1f959dfad3": ["6a02108f4ff0d683da734618"], //  ->Chicken Strips,Mac& cheese
    "6a0211114ff0d683da734619": ["6a01e8696d26cb1f959dfad8"], //  ->Beef loaded fries,pepsi
}; 

let allMealsData = []; 
let currentQty = 1;

// 2. جلب البيانات من السيرفر
async function fetchMeals() {
    try {
        let response = await fetch(`http://127.0.0.1:3000/api/meals`);
        if (!response.ok) throw new Error("Network response was not ok");
        allMealsData = await response.json();
        displayMeals(allMealsData);
        loadSavedProfile(); // بنحمل الحساسية بعد ما الداتا تيجي
    } catch (e) { 
        console.error("Error fetching meals:", e); 
        document.getElementById("rowdata").innerHTML = `<h3 class="text-center text-danger">Server Error! ❌</h3>`;
    }
}
fetchMeals();

// 3. عرض الوجبات
function displayMeals(list) {
    let rowData = document.getElementById("rowdata");
    if (!rowData) return;
    
    if (!list || list.length === 0) {
        rowData.innerHTML = `<div class="col-12 text-center mt-5"><h3 class="text-muted">No meals found! 🍽️</h3></div>`;
        return;
    }

    rowData.innerHTML = list.map(item => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center">
                <img src="${item.image}" height="180" style="object-fit:cover" onerror="this.src='https://via.placeholder.com/180'">
                <div class="card-body d-flex flex-column">
                    <h5 class="fw-bold">${item.name}</h5>
                    <p class="text-orange fw-bold">${item.price} EGP</p>
                    <button class="btn btn-orange mt-auto rounded-pill py-2" onclick="openMealModal('${item._id}')">Show Details</button>
                </div>
            </div>
        </div>`).join("");
}

// 4. حفظ البروفايل الصحي (الفنكشن اللي كانت ناقصة)
function saveProfile() {
    let allergies = [];
    document.querySelectorAll(".allergy-check:checked").forEach(input => {
        allergies.push(input.value);
    });
    
    let sugarPref = document.querySelector('input[name="sugar"]:checked')?.value || "Normal";

    localStorage.setItem("userAllergies", JSON.stringify(allergies));
    localStorage.setItem("userSugar", sugarPref);

    Swal.fire({ 
        title: 'Profile Saved! ✅', 
        text: `We will keep you safe from: ${allergies.join(", ") || "Nothing"}`,
        icon: 'success', 
        timer: 2000, 
        showConfirmButton: false 
    });
}

// 5. تحميل البروفايل المحفوظ (عشان الـ Checkboxes تفضل متعلم عليها)
function loadSavedProfile() {
    let savedAllergies = JSON.parse(localStorage.getItem("userAllergies")) || [];
    savedAllergies.forEach(val => {
        let checkbox = document.querySelector(`.allergy-check[value="${val}"]`);
        if (checkbox) checkbox.checked = true;
    });
    
    let savedSugar = localStorage.getItem("userSugar");
    if (savedSugar) {
        let radio = document.querySelector(`input[name="sugar"][value="${savedSugar}"]`);
        if (radio) radio.checked = true;
    }
}

// 6. نظام الفلترة
function filterCategory(cat, btn) {
    document.querySelectorAll('.btn-orange, .btn-outline-light').forEach(b => {
        b.classList.remove('btn-orange');
        b.classList.add('btn-outline-light');
    });
    
    // لو بننادي عليها من الزرار نفسه (Event)
    if (btn) {
        btn.classList.remove('btn-outline-light');
        btn.classList.add('btn-orange');
    }

    let filtered = (cat === 'All') ? allMealsData : allMealsData.filter(m => m.category === cat);
    displayMeals(filtered);
}

// 7. البحث
if(document.getElementById("searchInput")) {
    document.getElementById("searchInput").oninput = (e) => {
        let term = e.target.value.toLowerCase();
        displayMeals(allMealsData.filter(m => m.name.toLowerCase().includes(term)));
    };
}

// 8. المودال والتفاصيل
function openMealModal(id) {
    let meal = allMealsData.find(m => m._id === id);
    if (meal) {
        currentQty = 1;
        document.getElementById("modalQty").innerText = currentQty;
        document.getElementById("modalName").innerText = meal.name;
        document.getElementById("modalPrice").innerText = meal.price + " EGP";
        document.getElementById("modalImage").src = meal.image;
        document.getElementById("modalAllergens").innerText = (meal.allergens && meal.allergens.length) ? meal.allergens.join(", ") : "None";
        
        document.getElementById("modalCustomization").innerHTML = (meal.ingredients || []).map((ing, index) => `
            <div class="col-6 small mb-2">
                <input type="checkbox" class="custom-checkbox" value="${ing}" id="chk_${index}" checked> 
                <label for="chk_${index}">${ing}</label>
            </div>`).join("");
            
        document.getElementById("modalAddToCartBtn").onclick = () => {
            let selectedIngredients = Array.from(document.querySelectorAll('.custom-checkbox:checked')).map(cb => cb.value);
            addToCart(id, currentQty, selectedIngredients);
        };
        document.getElementById("mealModal").style.display = "flex";
    }
}

// 9. إضافة للسلة + AI
function addToCart(id, qty, customization) {
    let meal = allMealsData.find(m => m._id === id);
    let userAllergies = JSON.parse(localStorage.getItem("userAllergies")) || [];
    let foundAllergy = meal.allergens && meal.allergens.find(a => userAllergies.includes(a));

    if (foundAllergy) {
        Swal.fire({ 
            title: 'Allergy! ⚠️', 
            text: `Danger! This item contains (${foundAllergy}) which is in your health profile.`, 
            icon: 'error', 
            confirmButtonColor: '#ff7a00' 
        });
        return;
    }



    // ... كود الحساسية اللي فات ...

// 10. فحص تفضيلات السكر (Sugar Preference Guard)
let userSugar = localStorage.getItem("userSugar");
// لو المستخدم اختار Diet والوجبة فيها سكر (موجود في المكونات أو الـ description)
let hasSugar = meal.ingredients && meal.ingredients.some(ing => ing.toLowerCase().includes("sugar"));

if (userSugar === "Diet" && hasSugar) {
    Swal.fire({ 
        title: 'Diet Warning! 🥗', 
        text: `This item contains sugar, which doesn't match your Diet profile.`, 
        icon: 'warning', 
        confirmButtonColor: '#ff7a00' 
    });
    return; // بيمنعه يضيفها للسلة
}

// ... كمل باقي كود الإضافة للكارت والـ AI ...

    let cart = JSON.parse(localStorage.getItem('userCart')) || [];
    cart.push({ ...meal, qty: qty, cartId: Date.now(), customization: customization });
    localStorage.setItem('userCart', JSON.stringify(cart));
    
    closeModal();

    // تشغيل الـ AI Recommendation
    let recIds = aiRecommendations[id];
    if (recIds && recIds.length > 0) {
        let recMeal = allMealsData.find(m => m._id === recIds[0]);
        if (recMeal) {
            Swal.fire({
                title: 'Perfect Match! 🍟',
                text: `Customers usually order ${recMeal.name} with this. Add it for ${recMeal.price} EGP?`,
                imageUrl: recMeal.image,
                imageWidth: 150, 
                showCancelButton: true, 
                confirmButtonColor: '#ff7a00',
                confirmButtonText: 'Yes, add it!', 
                cancelButtonText: 'No, thanks'
            }).then((res) => {
                if (res.isConfirmed) {
                    let c = JSON.parse(localStorage.getItem('userCart')) || [];
                    c.push({ ...recMeal, qty: 1, cartId: Date.now()+1, customization: [] });
                    localStorage.setItem('userCart', JSON.stringify(c));
                    Swal.fire({ title: 'Items Added! 🛒', icon: 'success', timer: 1500, showConfirmButton: false });
                } else {
                    Swal.fire({ title: 'Added! 🛒', icon: 'success', timer: 1500, showConfirmButton: false });
                }
            });
            return;
        }
    }
    Swal.fire({ title: 'Added! 🛒', icon: 'success', timer: 1500, showConfirmButton: false });
}

function changeQty(val) { 
    currentQty = Math.max(1, currentQty + val); 
    document.getElementById("modalQty").innerText = currentQty; 
}

function closeModal() { 
    document.getElementById("mealModal").style.display = "none"; 
}   