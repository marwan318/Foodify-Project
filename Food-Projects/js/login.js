// ! All Variables
let loginform = document.getElementById('loginForm');
let loginemail = document.getElementById('loginEmail');
let loginpassword = document.getElementById('loginPassword');
let loginalert = document.getElementById('loginAlert');
let successalert = document.getElementById('loginsuccessAlert');

// منع الـ Refresh وتشغيل دالة الدخول
loginform.addEventListener('submit', function(e){
    e.preventDefault();
    loginUser(); // سميتها loginUser عشان متبقاش متكررة
});

async function loginUser(){
    console.log("جاري التحقق من البيانات...");
    
    let DataUsers = {
        email: loginemail.value,
        password: loginpassword.value,
    };

    try {
        // التعديل الجوهري: استخدمنا 127.0.0.1 بدل localhost
        const response = await fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DataUsers)
        });

        const result = await response.json();

        if(response.ok){
            console.log("تم تسجيل الدخول بنجاح");
            
            // تخزين بيانات اليوزر عشان الموقع "يعرفه" وهو شغال
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', result.username); // الباك اند بيبعت الـ username

            // إظهار رسالة النجاح
            successalert.classList.replace("d-none", "d-block");
            loginalert.classList.replace("d-block", "d-none");

            // التوجه للمنيو
            setTimeout(function(){
                window.location.href = '../menu.html';
            }, 2000);
            
        } else {
            // لو الباسورد غلط أو الحساب مش موجود
            console.log("فشل تسجيل الدخول:", result.message);
            loginalert.innerHTML = result.message || "الإيميل أو الباسورد غلط";
            loginalert.classList.replace("d-none", "d-block");
            successalert.classList.replace("d-block", "d-none");
        }
    } catch (error) {
        console.error('Error Details:', error);
        loginalert.innerHTML = "حدث خطأ في الاتصال بالسيرفر";
        loginalert.classList.replace("d-none", "d-block");
        successalert.classList.replace("d-block", "d-none");
    }
}