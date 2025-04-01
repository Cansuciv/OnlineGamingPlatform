// Rating sistemini başlatma fonksiyonu
function initializeRatingSystem() {
    // Tüm rating öğelerini yönet
    manageRatingStates();

    // Rating değişikliklerini dinle
    document.addEventListener('change', handleRatingChange);

    // Sıfırlama alanına tıklama olayını ekle
    document.querySelectorAll('.rating-reset-area').forEach(resetArea => {
        resetArea.addEventListener('click', handleResetRating);
    });

    // Owl Carousel için özel yönetim
    setupOwlCarouselRatingSync();
}

// Yeni eklenen sıfırlama fonksiyonu
function handleResetRating(e) {
    const resetArea = e.currentTarget;
    const ratingContainer = resetArea.closest('.game-rating-container');
    const clearInput = ratingContainer.querySelector('.rating-clear');
    const item = ratingContainer.closest('.item');
    const gameId = getBaseGameId(item);

    // Gizli sıfırlama butonunu tetikle
    if (clearInput) {
        clearInput.checked = true;

        // LocalStorage'dan kaldır
        localStorage.removeItem(`rating_${gameId}`);

        // Görünümü güncelle
        const valueDisplay = ratingContainer.querySelector('.rating-value');
        if (valueDisplay) valueDisplay.textContent = '0';

        // Tüm örnekleri güncelle
        updateAllRatingItems(gameId, '0');
    }
}


// Rating durumlarını yönet
function manageRatingStates() {
    document.querySelectorAll('.item[data-game-id]').forEach(item => {
        const gameId = getBaseGameId(item);
        const savedRating = localStorage.getItem(`rating_${gameId}`);
        
        if (savedRating) {
            updateRatingDisplay(item, savedRating);
        }
    });
}

// Rating değişikliğini işle
function handleRatingChange(e) {
    if (e.target.matches('.rating input[type="radio"]')) {
        const input = e.target;
        const item = input.closest('.item');
        const gameId = getBaseGameId(item);
        const ratingValue = input.value;
        
        // LocalStorage'a kaydet
        localStorage.setItem(`rating_${gameId}`, ratingValue);
        
        // Tüm örnekleri güncelle
        updateAllRatingItems(gameId, ratingValue);
    }
}

// Tüm aynı oyun rating öğelerini güncelle
function updateAllRatingItems(gameId, ratingValue) {
    document.querySelectorAll(`.item[data-game-id^="${gameId}"]`).forEach(item => {
        updateRatingDisplay(item, ratingValue);
    });
}

// Tek bir öğenin rating görünümünü güncelle
function updateRatingDisplay(item, ratingValue) {
    const input = item.querySelector(`.rating input[value="${ratingValue}"]`);
    const valueDisplay = item.querySelector('.rating-value');
    
    if (input) input.checked = true;
    if (valueDisplay) valueDisplay.textContent = ratingValue;
}

// Owl Carousel için senkronizasyon ayarı
function setupOwlCarouselRatingSync() {
    if (typeof $.fn.owlCarousel === 'function') {
        $(document).ready(function() {
            $('.owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
                if (e.namespace && e.property.name === 'position') {
                    // Carousel hareket ettikten sonra ratingleri güncelle
                    setTimeout(() => {
                        const activeItems = $(this).find('.owl-item.active .item');
                        activeItems.each(function() {
                            const gameId = getBaseGameId(this);
                            const savedRating = localStorage.getItem(`rating_${gameId}`);
                            if (savedRating) {
                                updateRatingDisplay(this, savedRating);
                            }
                        });
                    }, 100);
                }
            });
        });
    }
}

// Oyunun temel ID'sini al
function getBaseGameId(item) {
    return item.dataset.gameId.split('-')[0];
}

// Sayfa yüklendiğinde rating sistemini başlat
document.addEventListener('DOMContentLoaded', initializeRatingSystem);