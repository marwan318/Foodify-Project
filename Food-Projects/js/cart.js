(function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert("Please login first! 😊");
        // لو صفحة اللوجين جوه فولدر اسمه pages
        window.location.href = 'pages/login.html'; 

        // أما لو صفحة اللوجين بره مع المنيو في نفس الفولدر سيبها كدة:
        // window.location.href = 'login.html';
    }
})();

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('userCart')) || [];
    let finalTotal = 0;
    
    document.getElementById("cartItems").innerHTML = cart.map((item, i) => {
        let total = item.price * item.qty;
        finalTotal += total;
        
        // التعديل هنا: بنجهز النص بتاع المكونات عشان يظهر في الكارت
        let customText = (item.customization && item.customization.length > 0) 
            ? `<div class="text-secondary mt-1" style="font-size: 0.85rem;"><i class="fa-solid fa-utensils"></i> ${item.customization.join(" - ")}</div>` 
            : `<div class="text-danger mt-1" style="font-size: 0.85rem;">No extra ingredients</div>`;

        return `
        <div class="d-flex justify-content-between border-bottom p-3 align-items-center bg-white mb-2 rounded shadow-sm">
            <div class="d-flex align-items-center">
                <img src="${item.image}" width="60" height="60" style="object-fit: cover;" class="rounded me-3">
                <div>
                    <h6 class="mb-0 fw-bold">${item.name} <span class="text-orange">(x${item.qty})</span></h6>
                    <small class="text-muted">${item.price} EGP</small>
                    ${customText} </div>
            </div>
            <div class="text-end">
                <p class="mb-0 fw-bold text-orange">${total} EGP</p>
                <button onclick="removeItem(${i})" class="btn text-danger p-0 border-0 bg-transparent small"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
        </div>`;
    }).join("") || "<h5 class='text-center p-5 text-muted'>Cart is empty! 🛒</h5>";

    document.getElementById("itemCount").innerText = cart.length;
    document.getElementById("totalPrice").innerText = finalTotal + " EGP";
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('userCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('userCart', JSON.stringify(cart));
    renderCart();
}

function checkout() {
    Swal.fire({ 
        title: 'Success! ✅', 
        text: 'Order Placed!', 
        icon: 'success',
        confirmButtonColor: '#ff7a00'
    }).then(() => {
        localStorage.removeItem('userCart');
        renderCart(); // عشان نفضي الكارت قدام عين العميل
        // window.location.href = 'home.html'; // لو عايز تحوله للهوم بعد الأوردر شيل الـ Comment
    });
}
renderCart();

function logout() {
    // 1. نمسح بيانات الجلسة
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    // 2. نرجعه للهوم ( index.html )
    window.location.href = "./home.html"; 
}