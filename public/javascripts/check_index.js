function summitData(){

    const id = document.getElementById('id').value;
    const password = window.btoa(document.getElementById('password').value);

    const url = 'http://localhost:80/';

    const res = fetch(url,{
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id: id,
            password:password
        }),
    })
    .then((response) => response.json())
    .then(data => checkToken(data));
}

function checkToken(data){
    const token = data.token;   
    const message = data.message;

    // 로그인 실패
    if( token == undefined){
        alert(message);
        window.location.reload();
    }

    else{
        // 로그인 성공
        window.sessionStorage.setItem("token", token);
        window.location.href = '/home';
    }
}

window.onload = function(){
    const url = 'http://localhost:80/home';

    const res = fetch(url,{
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({}),
    })
    .then((response) => response.json())
    .then(data => {
        if(data.message == 'login'){
            window.location.href = '/home';
        }
    });   
};
