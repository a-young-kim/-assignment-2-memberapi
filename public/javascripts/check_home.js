const host = '34.193.68.110';
//const host = 'localhost:3000';

window.onload = function(){
    const url = 'http://'+ host +'/home';
    let i = "";
    
   fetch(url,{
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({}),
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data.message);
       
        if(data.message != 'login'){
            window.location.href = '/';
        }

        else{
            const text = document.getElementById('succeed_id');
            text.innerHTML = "로그인 된 아이디: " + data.id;
        }
    });

};

function logout(){
    window.sessionStorage.clear();

    const url = 'http://'+ host +'/home/logout';

    fetch(url,{
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({}),
    })
    .then((response) => response.json())
    .then(data => console.log(data));

}