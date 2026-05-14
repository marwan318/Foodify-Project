


var orderBtn = document.getElementById('order');

orderBtn.addEventListener('click', function() {

    window.location = 'pages/login.html';
});




var logbtn = document.getElementById('loginBtn');

logbtn.addEventListener('click', function() {

    window.location = 'pages/login.html';
});




document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn'); // تأكد إن زرار اللوجين واخد id="loginBtn"

    if (isLoggedIn === 'true') {
        if (logoutBtn) logoutBtn.classList.remove('d-none'); // اظهر خروج
        if (loginBtn) loginBtn.classList.add('d-none');     // اخفي دخول
    } else {
        if (logoutBtn) logoutBtn.classList.add('d-none');    // اخفي خروج
        if (loginBtn) loginBtn.classList.remove('d-none');  // اظهر دخول
    }
});



function logout() {
    // 1. نمسح بيانات الجلسة
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    // 2. نرجعه للهوم ( index.html )
    // بمجرد ما يرجع للهوم، لو حاول يدخل المنيو الحماية هتطرده لأن isLoggedIn اتمسحت
    window.location.href = "./home.html"; 
}






// 


