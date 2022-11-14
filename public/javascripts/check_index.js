
function base64(){
    const password = document.getElementById('password');
    const base64_password = window.btoa(password.value);

    password.value = base64_password;

    return true;
}