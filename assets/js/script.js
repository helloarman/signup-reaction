const face = document.getElementById('face');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const male = document.getElementById('male');
const female = document.getElementById('female');
const others = document.getElementById('others');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const showIcon = document.getElementById('showIcon');
const hideIcon = document.getElementById('hideIcon');
const signUp = document.getElementById('signUp');
const formPage = document.getElementById('formPage');
const successful = document.getElementById('successful');
const textResponse = document.getElementById('textResponse');

var type = 'robot';
var action = 'happy';
var passShow = false;
var validEmail = false;
var passwordMatched = false;
var userName = '';

nameInput?.addEventListener('keyup', function(){
    userName = this.value;
});

// Eye Blink 
setInterval(function () {
    // If password field is clicked
    if (password === document.activeElement || confirmPassword === document.activeElement || passShow) {
        return;
    }

    faceActive(type, 'eyes-closed');
    setTimeout(function () {
        faceActive(type, action);
    }, 200);
}, 5000);

email?.addEventListener('keyup', function () {
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const emailx = 
    if (email.value.match(emailCheck)) {
        faceActive(type, 'happy');
        validEmail = true;
    } else {
        faceActive(type, 'sad');
        validEmail = false;
    }
});

// Password Start 

showIcon?.addEventListener('click', function () {
    password.setAttribute('type', 'text');
    // If password field is clicked
    faceActive(type, 'naughty');
    passShow = true;
    this.classList.remove('d-block');
    this.classList.add('d-none');
    hideIcon.classList.remove('d-none');
    hideIcon.classList.add('d-block');
});

hideIcon?.addEventListener('click', function () {
    password.setAttribute('type', 'password');
    faceActive(type, action);
    passShow = false;
    this.classList.remove('d-block');
    this.classList.add('d-none');
    showIcon.classList.remove('d-none');
    showIcon.classList.add('d-block');
});

// On focus Password Field Eye Will Close
password?.addEventListener('keyup', function () {
    // If password field is clicked
    if (passShow) {
        faceActive(type, 'naughty');
        return;
    }
    faceActive(type, 'eyes-closed');
    passwordMatched = false;
    confirmPassword.value = '';
});

confirmPassword?.addEventListener('keyup', function () {
    if(password.value != confirmPassword.value){
        faceActive(type, 'eyes-closed');
        passwordMatched = false;
    }else{
        faceActive(type, 'happy');
        passwordMatched = true;
    }
});
// Password End


// Mouse Hover Face Reaction Start
face.onmouseover = function () {
    // If password field is clicked
    if (password === document.activeElement || confirmPassword === document.activeElement) {
        faceActive(type, 'naughty');
        return;
    }
    faceActive(type, 'angry');
}

face.onmouseout = function () {
    // If password field is clicked
    if (password === document.activeElement || confirmPassword === document.activeElement) {
        faceActive(type, 'eyes-closed');
        return;
    }

    faceActive(type, 'happy');
}
// Mouse Hover Face Reaction End

// Gender Start 
male?.addEventListener('click', function () {
    type = 'boy';
    faceActive(type, 'happy');
});

female?.addEventListener('click', function () {
    type = 'girl';
    faceActive(type, 'happy');
});

others?.addEventListener('click', function () {
    type = 'robot';
    faceActive(type, 'happy');
});
// Gender End 

signUp.addEventListener('click', function () {
    // console.log(nameInput.value);
    if(nameInput.value && validEmail && (male.value || female.value || others.value) && passwordMatched){
        formPage.classList.remove('d-block');
        formPage.classList.add('d-none');
        successful.classList.remove('d-none');
        successful.classList.add('d-block');
        faceActive(type, 'wow');
        textResponse.innerHTML =  `<h1 class="text-center">Thanks ${userName} For Using This</h1>`;
    }else{
        faceActive(type, 'angry');
    }
    
    
});

function faceActive(type, action) {
    face.src = './assets/image/face/' + type + '-' + action + '.png';
}



