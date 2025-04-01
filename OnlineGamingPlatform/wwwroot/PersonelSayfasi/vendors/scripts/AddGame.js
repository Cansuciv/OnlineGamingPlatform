// Maksimum 4 dosya seçimini kontrol etme
document.getElementById('contentImages').addEventListener('change', function (e) {
    if (this.files.length > 4) {
        alert('En fazla 4 resim seçebilirsiniz!');
        this.value = '';
    }
});

// Tarih seçici ayarı
$('.date-picker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayHighlight: true
});

// Yeni tür ekleme fonksiyonu
document.getElementById('addGenreBtn').addEventListener('click', function () {
    const newGenreInput = document.getElementById('newGenre');
    const genreName = newGenreInput.value.trim();

    if (genreName) {
        // Benzersiz ID oluştur
        const uniqueId = 'customGenre_' + Date.now();

        // Yeni türü ekle
        const container = document.getElementById('customGenresContainer');
        const newGenre = document.createElement('div');
        newGenre.className = 'form-check';
        newGenre.innerHTML = `
            <input class="form-check-input" type="checkbox" name="gameTypes" id="${uniqueId}" value="${genreName}" checked>
            <label class="form-check-label" for="${uniqueId}">${genreName}</label>
            <button type="button" class="btn btn-sm btn-link text-danger remove-genre" data-id="${uniqueId}">
                <i class="dw dw-delete-3"></i>
            </button>
        `;
        container.appendChild(newGenre);

        // Input'u temizle
        newGenreInput.value = '';
    } else {
        alert('Lütfen bir tür adı giriniz!');
    }
});

// Özel türleri silme (delegasyon kullanarak)
document.getElementById('customGenresContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-genre') || e.target.closest('.remove-genre')) {
        const genreId = e.target.getAttribute('data-id') || e.target.closest('.remove-genre').getAttribute('data-id');
        document.querySelector(`#customGenresContainer #${genreId}`).closest('.form-check').remove();
    }
});