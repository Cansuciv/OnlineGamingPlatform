// Kredi kartı numarası formatlama fonksiyonu (boşluklu versiyon)
function formatCardNumber(input) {
    // Kursor pozisyonunu kaydet
    let cursorPos = input.selectionStart;
    let originalLength = input.value.length;
    let isDeleting = (originalLength > input.value.length);

    // Sadece rakamları al ve fazlalıkları sil
    let value = input.value.replace(/\D/g, '');

    // 16 haneden uzunsa kes
    if (value.length > 16) {
        value = value.substring(0, 16);
    }

    // Formatlı değeri oluştur (boşluklu)
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    // Input değerini güncelle
    input.value = formattedValue;

    // Kursor pozisyonunu ayarla
    if (isDeleting) {
        // Silme işlemi sırasında
        if (input.value[cursorPos] === ' ') {
            cursorPos--;
        }
    } else {
        // Ekleme işlemi sırasında
        if ((originalLength < input.value.length) && (cursorPos % 5 === 0)) {
            cursorPos++;
        }
    }

    input.setSelectionRange(cursorPos, cursorPos);

    // Kartın ön yüzünde göster (boşluklu)
    document.querySelector('.card-number-box').innerText = formattedValue || '#### #### #### ####';
}

// Kart numarası inputu için event listener
document.getElementById('creditCardInput').addEventListener('input', function (e) {
    formatCardNumber(this);
});

// Diğer fonksiyonlar (mevcut kodunuz)
document.querySelector('.card-holder-input').oninput = function () {
    document.querySelector('.card-holder-name').innerText = this.value || 'full name';
}

document.querySelector('.month-input').oninput = function () {
    document.querySelector('.exp-month').innerText = this.value || 'mm';
}

document.querySelector('.year-input').oninput = function () {
    document.querySelector('.exp-year').innerText = this.value || 'yy';
}

document.querySelector('.cvv-input').onmouseenter = function () {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = function () {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = function () {
    document.querySelector('.cvv-box').innerText = this.value || '';
}

// Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function () {
    // Kart numarası inputunu seç
    const cardInput = document.getElementById('creditCardInput');

    // Eğer input varsa event listener ekle
    if (cardInput) {
        cardInput.addEventListener('input', function (e) {
            formatCardNumber(this);
        });
    }
});