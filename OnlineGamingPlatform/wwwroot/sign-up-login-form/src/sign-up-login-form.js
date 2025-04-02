// Signup password toggle
const signupIcon = document.getElementById('toggleSignupPassword');
const signupPassword = document.getElementById('signup-password');

signupIcon.addEventListener('click', function () {
    togglePassword(signupPassword, signupIcon);
});

// Login password toggle
const loginIcon = document.getElementById('toggleLoginPassword');
const loginPassword = document.getElementById('login-password');

loginIcon.addEventListener('click', function () {
    togglePassword(loginPassword, loginIcon);
});

// Ortak fonksiyon
function togglePassword(passwordField, icon) {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// Google Sign-In functions
function onSuccess(googleUser) {
    console.log('Google girişi başarılı!');

    // Token'i al
    var id_token = googleUser.getAuthResponse().id_token;

    // Token'i backend'e gönder
    $.ajax({
        type: 'POST',
        url: '/Sayfa/GoogleLogin', // Backend endpoint'i
        data: { token: id_token },
        success: function (response) {
            // Başarılıysa MainPage'e yönlendir
            window.location.href = 'https://localhost:7135/Sayfa/MainPage';
        },
        error: function (xhr) {
            console.error('Hata:', xhr.responseText);
            alert('Google girişi başarısız!');
        }
    });
}

function onFailure(error) {
    console.error('Google giriş hatası:', error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}