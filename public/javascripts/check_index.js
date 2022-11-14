function summitData(){

    const id = document.getElementById('id').value;
    const password = window.btoa(document.getElementById('password').value);

    const url = 'http://34.193.68.110:80/';

    sendHttpRequest('Post', url, {
        id: id,
        password:password
    })
    .then((response) => console.log(response))
    .then(data => checkToken(data));
}

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        xhr.onload = () => {
            resolve(xhr.response);
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

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
    const url = 'http://34.193.68.110:80/home';

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


