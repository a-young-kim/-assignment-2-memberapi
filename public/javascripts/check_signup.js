
let summit_Active = 0;

function get_ID(){
    // find input ID
    let input = document.getElementById('make_id').value;
    
    if(input == "")
    {
        alert('아이디를 입력해주세요');
        return;
    }
    const url = 'http://localhost:3000/api/customers/checkId';

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

    let ID_result = document.getElementById('ID_result');
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
    let password = document.getElementById('make_password').value;
    let check_password = document.getElementById('check_password').value;

    let password_result = document.getElementById('password_result');
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

window.onload = function(){
    const btn = document.getElementById('summitbtn');
    btn.disabled = true;
};

function base64(){
    let password = document.getElementById('make_password');
    const base64_password = window.btoa(password.value);

    password.value = base64_password;
    console.log(password.value);

    return true;
}
