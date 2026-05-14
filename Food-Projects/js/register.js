let registerform = document.getElementById("registerForm");
let signinname = document.getElementById("signinName");
let signemail = document.getElementById("signinEmail");
let signpassword = document.getElementById("signinPassword");

let namealert = document.getElementById("nameMsg");
let emailalert = document.getElementById("emailMsg");
let passwordalert = document.getElementById("passMsg");
let existalert = document.getElementById("existMsg");
let successalert = document.getElementById("successMsg");

registerform.addEventListener('submit', function(e){
    e.preventDefault(); // بيمنع الصفحة إنها تقفل الريكويست
    if(checkvalidation()){
        addUser();
    }
});

async function addUser(){
    console.log("جاري الإرسال...");
    
    let userInfo = {
        username: signinname.value,
        email: signemail.value,
        password: signpassword.value
    };

    try {
        // استخدمنا 127.0.0.1 لضمان الاتصال المباشر
        const response = await fetch('http://127.0.0.1:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo)
        });

        const result = await response.json();

        if(response.ok){
            existalert.classList.replace("d-block", "d-none");
            successalert.classList.replace("d-none", "d-block");
            setTimeout(() => { window.location.href = 'login.html'; }, 2000);
            clearform();
        } else {
            existalert.innerHTML = result.message;
            existalert.classList.replace("d-none", "d-block");
        }
    } catch (error) {
        console.error('Error Details:', error);
        existalert.innerHTML = "حدث خطأ في الاتصال بالسيرفر";
        existalert.classList.replace("d-none", "d-block");
    }
}

function validatInputs(regex, element, alertMsg){
    if(regex.test(element.value)){
        alertMsg.classList.replace("d-block", "d-none");
        return true;
    } else {
        alertMsg.classList.replace("d-none", "d-block");
        return false;
    }
}

function checkvalidation(){
    return (
        validatInputs(/^[a-zA-Z0-9]{3,}$/, signinname, namealert) &&
        validatInputs(/^\S+@\S+\.\S+$/, signemail, emailalert) &&
        validatInputs(/^.{6,}$/ , signpassword, passwordalert)
    );
}

function clearform(){
    signinname.value = ""; signemail.value = ""; signpassword.value = "";
}