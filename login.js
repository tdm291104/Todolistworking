const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', ()=>{
    container.classList.add('active')
})

loginBtn.addEventListener('click', ()=>{
    container.classList.remove('active')
})

const loginApi = "https://api.storerestapi.com/auth/login";
const email = document.getElementById("loginEmail")
const password = document.getElementById("loginPassword")
const buttonlogin = document.getElementById("buttonlogin")

function login(){
  fetch(loginApi, {
    method: "POST",
    body: JSON.stringify({
      email: loginEmail.value.trim(),
      password: loginPassword.value.trim(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status == 200) {
        localStorage.access_token = res.data.access_token;
        alert("Đăng nhập thành công");
        console.log(res);
        updateButtonUI(true);
        window.location.href = "home.html"
      }
      else{
        alert("Đăng nhập thất bại");
        console.log(res)
      }
    })
    .catch((err) => {
      alert("Đăng nhập thất bại");
      console.log(err);
    })
    .finally(() => {
      render();
    });
}

function logout() {
  localStorage.removeItem('access_token');
  updateButtonUI(false);
}

function updateButtonUI(x) {
  if (x === true) {
    buttonlogin.innerText = "Log Out";
    buttonlogin.onclick = logout;
  } else {
    buttonlogin.innerText = "Sign In";
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
      }
      else{
        alert("Đăng ký thất bại");
        console.log(res)
      }
    })
    .catch((err) => {
      alert("Đăng ký thất bại");
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