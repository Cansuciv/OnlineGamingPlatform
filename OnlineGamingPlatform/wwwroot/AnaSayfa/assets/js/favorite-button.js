// Favori durumlarını yönetmek için ana fonksiyon
function manageFavoriteStates() {
    document.querySelectorAll('.item[data-game-id]').forEach(item => {
        const gameId = item.dataset.gameId;
        const baseGameId = gameId.split('-')[0]; // Oyunun temel ID'sini al (örn: "fortnite")
        const isFavorite = localStorage.getItem(`favorite_${baseGameId}`) === 'true';

        const checkbox = item.querySelector('.favorite-checkbox');
        if (checkbox) {
            // Checkbox durumunu güncelle
            checkbox.checked = isFavorite;

            // Yıldız görünümünü güncelle
            const stars = checkbox.parentElement.querySelectorAll('.glyphicon');
            if (stars.length >= 2) {
                stars[0].style.opacity = isFavorite ? '0' : '1'; // Boş yıldız
                stars[1].style.opacity = isFavorite ? '1' : '0'; // Dolu yıldız
            }
        }
    });
}

// Favori butonlarına tıklama olayı
document.addEventListener('click', function (e) {
    if (e.target.closest('.custom-checkbox')) {
        const checkbox = e.target.closest('.custom-checkbox').querySelector('input[type="checkbox"]');
        const item = e.target.closest('.item');
        if (item && checkbox) {
            const gameId = item.dataset.gameId;
            const baseGameId = gameId.split('-')[0];
            const isFavorite = checkbox.checked;

            // LocalStorage'a kaydet
            localStorage.setItem(`favorite_${baseGameId}`, isFavorite);

            // Tüm örnekleri güncelle
            updateAllFavoriteItems(baseGameId, isFavorite);
        }
    }
});

// Tüm aynı oyun öğelerini güncelle
function updateAllFavoriteItems(baseGameId, isFavorite) {
    document.querySelectorAll(`.item[data-game-id^="${baseGameId}"]`).forEach(item => {
        const checkbox = item.querySelector('.favorite-checkbox');
        if (checkbox) {
            checkbox.checked = isFavorite;
            const stars = checkbox.parentElement.querySelectorAll('.glyphicon');
            if (stars.length >= 2) {
                stars[0].style.opacity = isFavorite ? '0' : '1';
                stars[1].style.opacity = isFavorite ? '1' : '0';
            }
        }
    });
}

// Owl Carousel için özel çözüm
if (typeof $.fn.owlCarousel === 'function') {
    $(document).ready(function () {
        var owl = $('.owl-carousel');

        // Carousel başlatma
        owl.owlCarousel({
            // Owl Carousel ayarlarınız
            loop: false,
            margin: 10,
            nav: true,
            responsive: {
                0: { items: 1 },
                600: { items: 3 },
                1000: { items: 5 }
            }
        });

        // Her kaydırmada favori durumlarını güncelle
        owl.on('translated.owl.carousel', function (event) {
            // Kaydırma animasyonu bittikten sonra çalışır
            setTimeout(function () {
                manageFavoriteStates();
            }, 50);
        });

        // İlk yüklemede favori durumlarını kontrol et
        manageFavoriteStates();
    });
} else {
    // Owl Carousel yoksa normal yükleme
    document.addEventListener('DOMContentLoaded', manageFavoriteStates);
}