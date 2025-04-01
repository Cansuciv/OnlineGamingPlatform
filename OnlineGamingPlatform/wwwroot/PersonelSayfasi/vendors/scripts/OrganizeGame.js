$(document).ready(function () {
    // Ana resim önizleme
    $('#mainImageUpload').change(function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#mainImagePreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    // İçerik resimleri önizleme
    $('#contentImagesUpload').change(function (e) {
        const files = e.target.files;
        if (files.length > 4) {
            alert('En fazla 4 resim seçebilirsiniz!');
            $(this).val('');
            return;
        }

        $('#contentImagesPreview').empty();
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#contentImagesPreview').append(`
                    <img src="${e.target.result}" class="img-thumbnail mr-2 mb-2" style="height:100px;">
                `);
            }
            reader.readAsDataURL(files[i]);
        }
    });

    // Tür ekleme fonksiyonu
    function addGenreTag(genre) {
        if (!$('input[name="genres[]"]').filter(function () {
            return $(this).val() === genre;
        }).length) {
            $('#genreTags').append(`
                <span class="badge badge-primary badge-pill mr-2 mb-2 genre-tag">
                    ${genre}
                    <input type="hidden" name="genres[]" value="${genre}">
                    <button type="button" class="close" aria-label="Remove">&times;</button>
                </span>
            `);
            updateGenresInput();
        }
    }

    // Tür inputunu güncelle
    function updateGenresInput() {
        const genres = [];
        $('input[name="genres[]"]').each(function () {
            genres.push($(this).val());
        });
        $('#genresInput').val(genres.join(','));
    }

    // Tür seçiciyi dinle
    $('#genreSelector').keypress(function (e) {
        if (e.which === 13) { // Enter tuşu
            e.preventDefault();
            const genre = $(this).val();
            if (genre) {
                addGenreTag(genre);
                $(this).val('');
            }
        }
    });

    // Tür kaldırma
    $('#genreTags').on('click', '.close', function () {
        $(this).parent().remove();
        updateGenresInput();
    });

    // Form gönderimi (Demo amaçlı)
    $('#editGameForm').submit(function (e) {
        e.preventDefault();
        alert('Oyun bilgileri güncellendi!\n\nOyun Kodu: ' + $('#editGameCode').val());

        // Gerçek uygulamada burada AJAX isteği gönderilir
        // $.ajax({
        //     url: '/api/games/update',
        //     type: 'POST',
        //     data: new FormData(this),
        //     processData: false,
        //     contentType: false,
        //     success: function(response) {
        //         alert('Oyun başarıyla güncellendi!');
        //     }
        // });
    });
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

// Ana resim yüklendiğinde
document.getElementById('mainImageUpload').addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('mainImagePreview').setAttribute('src', e.target.result);
            document.getElementById('mainImageContainer').style.display = 'block';
        }

        reader.readAsDataURL(e.target.files[0]);
    }
});

// İçerik resimleri yüklendiğinde
// Ana resim yüklendiğinde
document.getElementById('mainImageUpload').addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('mainImagePreview').setAttribute('src', e.target.result);
            document.getElementById('mainImageContainer').style.display = 'block';
            document.getElementById('mainImageUpload').value = ''; // Input'u temizle
        }

        reader.readAsDataURL(e.target.files[0]);
    }
});

// İçerik resimleri yüklendiğinde
document.getElementById('contentImagesUpload').addEventListener('change', function (e) {
    var files = e.target.files;
    var container = document.getElementById('contentImagesPreview');

    if (files && files.length > 0) {
        document.getElementById('contentImagesContainer').style.display = 'block';

        for (var i = 0; i < Math.min(files.length, 4); i++) {
            var reader = new FileReader();

            reader.onload = (function (file) {
                return function (e) {
                    var imgContainer = document.createElement('div');
                    imgContainer.style.position = 'relative';
                    imgContainer.style.marginRight = '10px';
                    imgContainer.style.marginBottom = '10px';

                    var img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'img-thumbnail';
                    img.style.width = '300px';    // Ana resimle aynı genişlik
                    img.style.height = '400px';   // Ana resimle aynı yükseklik
                    img.style.objectFit = 'cover'; // Oranları koruyarak kırpma

                    // Silme butonu kodu...
                    var deleteBtn = document.createElement('span');
                    deleteBtn.className = 'delete-image-btn';
                    deleteBtn.innerHTML = '×';
                    deleteBtn.style.position = 'absolute';
                    deleteBtn.style.top = '5px';
                    deleteBtn.style.right = '5px';
                    deleteBtn.style.background = 'red';
                    deleteBtn.style.color = 'white';
                    deleteBtn.style.borderRadius = '50%';
                    deleteBtn.style.width = '20px';
                    deleteBtn.style.height = '20px';
                    deleteBtn.style.textAlign = 'center';
                    deleteBtn.style.lineHeight = '20px';
                    deleteBtn.style.cursor = 'pointer';
                    deleteBtn.onclick = function () {
                        imgContainer.remove();
                        if (document.getElementById('contentImagesPreview').children.length === 0) {
                            document.getElementById('contentImagesContainer').style.display = 'none';
                        }
                    };

                    imgContainer.appendChild(img);
                    imgContainer.appendChild(deleteBtn);
                    container.appendChild(imgContainer);
                };
            })(files[i]);

            reader.readAsDataURL(files[i]);
        }

        document.getElementById('contentImagesUpload').value = '';
    }
});


// Ana resmi silme fonksiyonu
function removeMainImage() {
    document.getElementById('mainImageContainer').style.display = 'none';
    document.getElementById('mainImagePreview').src = '#';
    document.getElementById('mainImageUpload').value = ''; // Input'u temizle
}