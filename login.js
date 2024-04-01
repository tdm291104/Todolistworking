const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', ()=>{
    container.classList.add('active')
})

loginBtn.addEventListener('click', ()=>{
    container.classList.remove('active')
})

const loginApi = "https://recruitment-api.pyt1.stg.jmr.pl/login";
const email = document.getElementById("loginEmail")
const password = document.getElementById("loginPassword")
const buttonlogin = document.getElementById("buttonlogin")

function login(){
  fetch(loginApi, {
    method: "POST",
    body: JSON.stringify({
      login: email.value.trim(),
      password: password.value.trim()
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status === "ok") {
        localStorage.status = res.status;
        alert("Đăng nhập thành công");
        console.log(res);
        updateButtonUI(true);
        window.location.href = "home.html"
      }
      else{
        alert("Đăng nhập thất bại");
        validateForm()
        console.log(res)
      }
    })
    .catch((err) => {
      alert("Đăng nhập thất bại 33");
      validateForm()
      console.log(err);
    })
    .finally(() => {
      render();
    });
}

function logout() {
  localStorage.removeItem('access_token');
  updateButtonUI(false);
  email.classList.remove("success")
  password.classList.remove("success")
}

function updateButtonUI(x) {
  if (x === true) {
    buttonlogin.innerText = "Log Out";
    buttonlogin.onclick = logout;
  } else {
    buttonlogin.innerText = "Login";
    email.value = "";
    password.value = "";
    buttonlogin.onclick = login;
  }
}

function checkLoggedIn() {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    updateButtonUI(true);
  } else {
    updateButtonUI(false);
  }
}
checkLoggedIn();

const registerApi = "https://api.storerestapi.com/auth/register"
const registerName =  document.getElementById("registerName")
const registerEmail = document.getElementById("registerEmail")
const registerPassword = document.getElementById("registerPassword")
const registerPasswordrepeat = document.getElementById("registerPasswordrepeat")

function register(){
  fetch(registerApi, {
    method: "POST",
    body: JSON.stringify({
      name: registerName.value.trim(),
      email: registerEmail.value.trim(),
      number: 123456,
      password: registerPassword.value.trim(),
      password_repeat: registerPassword.value.trim()
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status == 201) {
        alert("Đăng ký thành công");
        console.log(res);
        registerName.value = ""
        registerEmail.value = ""
        registerPassword.value = ""
        registerPasswordrepeat.value = ""
        registerName.classList.remove("success")
        registerEmail.classList.remove("success")
        registerPassword.classList.remove("success")
        registerPasswordrepeat.classList.remove("success")
      }
      else{
        alert("Đăng ký thất bại");
        validateFormRegister()
        console.log(res)
      }
    })
    .catch((err) => {
      alert("Đăng ký thất bại");
      validateFormRegister()
      console.log(err);
    })
    .finally(() => {
      render();
    });
}

document.querySelectorAll(".container .right .top button").forEach(function(button) {
  button.addEventListener("click", function() {
      document.querySelectorAll(".container .right .top button").forEach(function(btn) {
          btn.classList.remove("id1");
      });
      button.classList.add("id1");
      filterItems(button.textContent);
  });
});

//Border login
function validateEmail(){
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!emailPattern.test(email.value)){
      email.classList.add("error")
      email.classList.remove("success")
      return false
  }else if(email.value === ""){
      email.classList.add("error")
      email.classList.remove("success")
      return false
  }else{
      email.classList.remove("error")
      email.classList.add("success")
      return true
  }
}

function validatePws(){
  if(password.value === ""){
      password.classList.add("error")
      password.classList.remove("success")
      return false
  }else{
      password.classList.remove("error")
      password.classList.add("success")
      return true
  }
}
function validateForm(){
  validateEmail()
  validatePws()
}

// border register

function validateNameRegister(){
  if(registerName.value === ""){
    registerName.classList.add("error")
    registerName.classList.remove("success")
    return false
  }else{
    registerName.classList.remove("error")
    registerName.classList.add("success")
    return true
  }
}

function validateEmailRegister(){
  const emailPatternregister = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!emailPatternregister.test(email.value)){
      registerEmail.classList.add("error")
      registerEmail.classList.remove("success")
      return false
  }else if(registerEmail.value === ""){
      registerEmail.classList.add("error")
      registerEmail.classList.remove("success")
      return false
  }else{
      registerEmail.classList.remove("error")
      registerEmail.classList.add("success")
      return true
  }
}

function validatePwsRegister(){
  if(registerPassword.value === ""){
      registerPassword.classList.add("error")
      registerPassword.classList.remove("success")
      return false
  }else{
      registerPassword.classList.remove("error")
      registerPassword.classList.add("success")
      return true
  }
}
function validatePwsRegisterRepeat(){
  if(registerPasswordrepeat.value === ""){
      registerPasswordrepeat.classList.add("error")
      registerPasswordrepeat.classList.remove("success")
      return false
  }else{
      registerPasswordrepeat.classList.remove("error")
      registerPasswordrepeat.classList.add("success")
      return true
  }
}
function validateFormRegister(){
  validateNameRegister()
  validateEmailRegister()
  validatePwsRegister()
  validatePwsRegisterRepeat()
}