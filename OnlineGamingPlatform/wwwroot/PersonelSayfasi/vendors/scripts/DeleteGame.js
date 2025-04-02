$(document).ready(function () {
    // Oyun bilgilerini doğrulama butonu
    $('#verifyGameBtn').click(function () {
        const gameCode = $('#deleteGameCode').val().trim();
        const gameName = $('#deleteGameName').val().trim();

        if (!gameCode || !gameName) {
            alert('Lütfen oyun kodu ve adını giriniz.');
            return;
        }

        // Burada normalde bir AJAX isteği ile sunucudan oyun bilgileri doğrulanır
        // Örnek amaçlı sabit veri kullanıyoruz

        // Oyun bilgilerini göster (gerçek uygulamada bu veriler sunucudan gelmeli)
        $('#displayGameCode').text(gameCode);
        $('#displayGameName').text(gameName);
        $('#displayGamePrice').text('99.99');
        $('#displayGameGenres').text('Aksiyon, Macera');
        $('#displayGameDate').text('15.05.2023');
        $('#displayGameDescription').text('Bu örnek bir oyun açıklamasıdır. Gerçek uygulamada bu bilgiler sunucudan gelecektir.');

        // Bilgi container'ını göster
        $('#gameInfoContainer').show();

        // Silme butonunu göster
        $('#deleteGameBtn').show();
        $('#verifyGameBtn').hide();
    });

    // Silme butonu tıklandığında onay modalını göster
    $('#deleteGameBtn').click(function (e) {
        e.preventDefault();
        const gameName = $('#deleteGameName').val().trim();
        $('#gameToDeleteName').text(gameName);
        $('#confirmationModal').modal('show');
    });

    // Onay modalındaki sil butonu
    $('#confirmDeleteBtn').click(function () {
        const gameCode = $('#deleteGameCode').val().trim();
        const gameName = $('#deleteGameName').val().trim();

        // Burada normalde bir AJAX isteği ile silme işlemi yapılır
        console.log('Silinecek oyun kodu:', gameCode);

        // Örnek başarılı işlem sonrası
        $('#confirmationModal').modal('hide');
        $('#deletedGameName').text(gameName);
        $('#successModal').modal('show');

        // Formu temizlex   
        setTimeout(function () {
            $('#deleteGameForm')[0].reset();
            $('#gameInfoContainer').hide();
            $('#deleteGameBtn').hide();
            $('#verifyGameBtn').show();
            $('#successModal').modal('hide');
        }, 2000);
    });

    // Başarı modalı kapatıldığında
    $('#successModal').on('hidden.bs.modal', function () {
        // Formu temizle
        $('#deleteGameForm')[0].reset();
        $('#gameInfoContainer').hide();
        $('#deleteGameBtn').hide();
        $('#verifyGameBtn').show();
    });
});