const host = '34.193.68.110';
//const host = 'localhost:3000';

let summit_Active = 0;

function get_ID(){
    // find input ID
    const input = document.getElementById('make_id').value;
    
    if(input == "")
    {
        alert('아이디를 입력해주세요');
        return;
    }
    const url = 'http://'+ host +'/api/customers/checkId';

    const res = fetch(url,{
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id: input
        }),
    })
    .then((response) => response.json())
    .then(data => check_ID(data));
}

function check_ID(data){

    const ID_result = document.getElementById('ID_result');

    if(data == null){
        ID_result.innerText = "사용 가능한 아이디입니다.";
        summit_Active = summit_Active + 1;
        btnActive();
    }

    else{
        alert('이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.');
    }
}

function check_Password(){
    const password = document.getElementById('make_password').value;
    const check_password = document.getElementById('check_password').value;

    const password_result = document.getElementById('password_result');
    if (password == ""){
        alert('비밀번호를 입력해주세요');
        return;
    }

    else if( password == check_password){
        password_result.innerText = "Password가 서로 일치합니다.";
        summit_Active = summit_Active + 1;
        // 버튼 실행 
        btnActive();
    }

    else{
        password_result.innerText = "Password가 서로 일치하지 않습니다.";
    }
}

function btnActive(){

    const btn = document.getElementById('summitbtn');
    if( summit_Active > 1){
        btn.disabled = false;
    }
}
function summitData(){
    const password = window.btoa(document.getElementById('make_password').value);
    const id = document.getElementById('make_id').value;

    const url = 'http://'+ host +'/signup';

   fetch(url,{
        method : "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            login_id: id,
            password: password
        }),
    })
    .then((response) => {
        
        if(response.json()!= ""){
            window.location.href = response.url;
        }
        else{
            alert('이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.');
        }
    });
}

window.onload = function(){
    
    const url = 'http://'+ host +'/home';

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
        else{
            const btn = document.getElementById('summitbtn');
            btn.disabled = true;
        }
    });
};

