// Şifre Göster/Gizle
const signupIcon = document.getElementById('toggleSignupPassword');
const signupPassword = document.getElementById('signup-password');
const loginIcon = document.getElementById('toggleLoginPassword');
const loginPassword = document.getElementById('login-password');

function togglePassword(passwordField, icon) {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

signupIcon.addEventListener('click', () => togglePassword(signupPassword, signupIcon));
loginIcon.addEventListener('click', () => togglePassword(loginPassword, loginIcon));

// Google Sign-In: Butonu render et
function onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;

    // Backend'e gönder (Controller'da işlenecek)
    $.ajax({
        type: 'POST',
        url: '/Sayfa/GoogleLogin',
        data: { token: idToken },
        success: function () {
            window.location.href = '/Sayfa/MainPage';
        },
        error: function (xhr) {
            console.error('Hata:', xhr.responseText);
            alert('Google girişi başarısız!');
        }
    });
}

function onFailure(error) {
    console.log(error);
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
function googleLoginClick() {
    // Google oturum açma işlemini tetikle
    gapi.auth2.getAuthInstance().signIn().then(onSuccess, onFailure);
}
function initGoogleAuth() {
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com'
        });
    });
}
