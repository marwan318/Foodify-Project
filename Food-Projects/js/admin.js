document.getElementById('addMealForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    // 1. تجميع الداتا (النسخة المتأمنة)
    let categoryDropdown = document.getElementById('mealCategory');
    let mealCategory = categoryDropdown.options[categoryDropdown.selectedIndex].value;

    let ingredientsValue = document.getElementById('mealIngredients').value;
    let allergensValue = document.getElementById('mealAllergens').value;

    let newMeal = {
        name: document.getElementById('mealName').value,
        price: Number(document.getElementById('mealPrice').value),
        category: mealCategory, // 👈 كدة هيسحب القيمة المختارة صح
        image: document.getElementById('mealImage').value,
        isFeatured: document.getElementById('isFeatured').checked,
        
        // تحويل النص لمصفوفة ونضيفها
        ingredients: ingredientsValue ? ingredientsValue.split(',').map(item => item.trim()) : [],
        allergens: allergensValue ? allergensValue.split(',').map(item => item.trim()) : [],
        sizes: [] 
    };

    console.log("📢 الداتا اللي خارجة من الأدمن:", newMeal);

    try {
        let response = await fetch('http://localhost:3000/api/add-meal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMeal)
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Meal Added!',
                text: `${newMeal.name} has been added successfully!`,
                confirmButtonColor: '#ff7a00'
            });
            document.getElementById('addMealForm').reset();
        } else {
            throw new Error("Failed to add meal");
        }
    } catch (error) {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Is your server running?' });
    }
});