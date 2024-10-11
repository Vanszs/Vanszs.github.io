document.getElementById('nftForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cryptoAddress = document.getElementById('cryptoAddress').value;

    // Validation for crypto address
    if (!web3.utils.isAddress(cryptoAddress)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid crypto address!',
        });
        return;
    }

    // NFT ownership checking logic goes here
    // If eligible for the tournament:
    Swal.fire({
        title: 'Selamat!',
        text: 'Anda eligible untuk ikut turnamen ini. Klik "Selanjutnya" untuk daftar.',
        icon: 'success',
        confirmButtonText: 'Selanjutnya'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "form.html";
        }
    });
});
