
//   <!--  |----------------------------------|
//         | SignUp Reaction by ARMAN RAHMAN  |
//         |----------------------------------| -->
const bangla = document.getElementById('bangla');
const face = document.getElementById('face');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const male = document.getElementById('male');
const female = document.getElementById('female');
const others = document.getElementById('others');
const genderInput = document.getElementsByName('genderInput');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const showIcon = document.getElementById('showIcon');
const hideIcon = document.getElementById('hideIcon');
const signUp = document.getElementById('signUp');
const formPage = document.getElementById('formPage');
const successful = document.getElementById('successful');
const doneTextResponse = document.getElementById('doneTextResponse');
const textResponse = document.getElementById('textResponse');

var type = 'robot';
var action = 'happy';
var passShow = false;
var validEmail = false;
var passwordMatched = false;
var userName = '';
var userGender = '';
var userLanguage = 'en';
var userText = '';

// Language Function Start
var language = {
    'How are you?': {
        'en': 'How are you?',
        'bn': 'কেমন আছেন?'
    },
    'What is your name?': {
        'en': 'What is your Name?',
        'bn': 'আপনার নাম কি?'
    },
    'What is your email?': {
        'en': 'What is your email?',
        'bn': 'আপনার ইমেইল আইডি কি?'
    },
    'Hey Sis, How are you?': {
        'en': 'Hey Sis, How are you?',
        'bn': 'হেই আপু, কেমন আছেন?'
    },
    'Hey Bro, How are you?': {
        'en': 'Hey Bro, How are you?',
        'bn': 'হেই ভাই, কেমন আছেন?'
    },
    'Hey, How are you?': {
        'en': 'Hey, How are you?',
        'bn': 'হেই, কেমন আছেন?'
    },
    'Is that any type of email? Write correctly!': {
        'en': 'Is that any type of email? Write correctly!',
        'bn': 'এটা কোনো ইমেইল হইলো? ঠিক ভাবে লিখেন!'
    },
    'Now Okay': {
        'en': 'Now Okay',
        'bn': 'এখন ঠিক আছে'
    },
    'Yes Do not show password to anyone': {
        'en': 'Yes Do not show password to anyone',
        'bn': 'হ্যাঁ পাসওয়ার্ড কাউকে দেখাবেন না'
    },
    'Enter a strong password': {
        'en': 'Enter a strong password',
        'bn': 'একটা কঠিন পাসওয়ার্ড লিখে ফেলেন'
    },
    'Password should be at least 8 characters long': {
        'en': 'Password should be at least 8 characters long',
        'bn': 'অন্তত ৮টা ক্যারেক্টার দেন?'
    },
    'Password should contain at least one digit': {
        'en': 'Password should contain at least one digit',
        'bn': 'আরে একটা সংখ্যা তো দিবেন সাথে নাকি?'
    },
    'Password should contain at least one alphabet': {
        'en': 'Password should contain at least one alphabet',
        'bn': 'আরে একটা অক্ষর তো দিবেন সাথে নাকি?'
    },
    'Password should contain at least one special character': {
        'en': 'Password should contain at least one special character',
        'bn': 'অন্তত একটা স্পেশাল ক্যারেক্টার ও দিয়ে দেন?'
    },
    'Now type the exact password again': {
        'en': 'Now type the exact password again',
        'bn': 'এখন হুবহু পাসওয়ার্ডটি আবার লেখেন'
    },
    'First fill the form properly': {
        'en': 'First fill the form properly',
        'bn': 'আগে ফর্মটি ভালোমত পূরণ করুণ'
    },
    'Thanks #name For Using Me!': {
        'en': 'Thanks #name For Using Me!',
        'bn': 'ধন্যবাদ #name আমাকে ব্যবহার করার জন্য!'
    },
};

bangla.addEventListener('click', function () {
    if (userLanguage == 'en') {
        userLanguage = 'bn';
        lang(userText);
    } else {
        userLanguage = 'en';
        lang(userText);
    }
});

function lang(text){
    textResponse.innerText = language[text][userLanguage];
    userText = text;
}
// Language Function End

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

// Name 
nameInput?.addEventListener('keyup', function () {
    userName = this.value;
});

nameInput?.addEventListener('focus', function () {
    lang('What is your name?');
});

// Email
email?.addEventListener('keyup', function () {
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(emailCheck)) {
        faceActive(type, 'happy');
        validEmail = true;
        lang('Now Okay');
    } else {
        faceActive(type, 'sad');
        validEmail = false;
        lang('Is that any type of email? Write correctly!');
    }
});

email?.addEventListener('focus', function () {
    lang('What is your email?');
});

// Password Start 
showIcon?.addEventListener('click', function () {
    password.setAttribute('type', 'text');
    // If password field is clicked
    faceActive(type, 'naughty');
    passShow = true;
    validatePassword(password.value);
    this.classList.remove('d-block');
    this.classList.add('d-none');
    hideIcon.classList.remove('d-none');
    hideIcon.classList.add('d-block');
});

hideIcon?.addEventListener('click', function () {
    password.setAttribute('type', 'password');
    faceActive(type, action);
    passShow = false;
    lang('Yes Do not show password to anyone');
    this.classList.remove('d-block');
    this.classList.add('d-none');
    showIcon.classList.remove('d-none');
    showIcon.classList.add('d-block');
});

// On focus Password Field Eye Will Close
password?.addEventListener('keyup', function () {
    // If password field is clicked
    if (passShow) {
        validatePassword(password.value);
        return;
    }
    faceActive(type, 'eyes-closed');
    passwordMatched = false;
    confirmPassword.value = '';
});

password?.addEventListener('focus', function () {
    lang('Enter a strong password');
});

confirmPassword?.addEventListener('keyup', function () {
    if (password.value != confirmPassword.value) {
        faceActive(type, 'eyes-closed');
        passwordMatched = false;
        lang('Now type the exact password again');
    } else {
        faceActive(type, 'happy');
        passwordMatched = true;
        lang('Now Okay');
    }
});

function validatePassword(password) {
    if (password.length < 8) {
      // Level 1 validation: Password should be at least 8 characters long
      lang('Password should be at least 8 characters long');
    } else if (!/\d/.test(password)) {
        // Level 2 validation: Password should contain at least one digit
        lang('Password should contain at least one digit');
    }else if (!/[a-zA-Z]/.test(password)) {
        // Level 2 validation: Password should contain at least one digit
        lang('Password should contain at least one alphabet');
    } else if (!/[!@#$%^&*]/.test(password)) {
        // Level 3 validation: Password should contain at least one special character
        lang('Password should contain at least one special character');
     } else {
        // Complex Password
        lang('Now Okay');
    }
  }
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
    userGender = this.value;
    lang('Hey Bro, How are you?')
    faceActive(type, 'happy');
});

female?.addEventListener('click', function () {
    type = 'girl';
    userGender = this.value;
    lang('Hey Sis, How are you?')
    faceActive(type, 'happy');
});

others?.addEventListener('click', function () {
    type = 'robot';
    lang('Hey, How are you?')
    userGender = this.value;
    faceActive(type, 'happy');
});
// Gender End 

// Sign Up Action
signUp.addEventListener('click', function () {
    // console.log(nameInput.value);
    if (nameInput.value && validEmail && userGender && passwordMatched) {
        formPage.classList.remove('d-block');
        formPage.classList.add('d-none');
        successful.classList.remove('d-none');
        successful.classList.add('d-block');
        faceActive(type, 'wow');

        lang('Thanks #name For Using Me!');
        textResponse.innerText = textResponse.innerText.replace('#name', nameInput.value);
    } else {
        navigator.vibrate(500);
        faceActive(type, 'angry');
        lang('First fill the form properly');
    }


});

// Face Reaction Function 
function faceActive(type, action) {
    face.src = './assets/image/face/' + type + '-' + action + '.png';
}