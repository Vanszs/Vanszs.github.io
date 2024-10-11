// Infura URL for Polygon Mainnet
const infuraUrl = 'https://polygon-mainnet.infura.io/v3/afd9253b37f84c958fdd3d2023f6af5c'; // Replace with your actual Infura project ID
const nftContractAddress = "0x6d778a0f5e07c01211672F57f246166ccF6541C1"; // Address of the NFT contract you're checking

// Create a Web3 instance connected to the Infura Polygon node
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// ABI (Application Binary Interface) for the NFT contract (ERC721 standard)
const nftABI = [
    {
        "constant": true,
        "inputs": [{ "name": "owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }
];

// Event listener for form submission
document.getElementById('nftForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cryptoAddress = document.getElementById('cryptoAddress').value;

    // Check if the crypto address is valid
    if (!web3.utils.isAddress(cryptoAddress)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid crypto address!',
        });
        return;
    }

    try {
        // Create contract instance
        const contract = new web3.eth.Contract(nftABI, nftContractAddress);
        
        // Call the balanceOf method to check NFT ownership
        const balance = await contract.methods.balanceOf(cryptoAddress).call();

        if (balance > 0) {
            // If balance is greater than 0, show SweetAlert notification and redirect
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
        } else {
            document.getElementById('result').innerText = "Address does not own the specified NFT on Polygon.";
        }
    } catch (error) {
        console.error('Error checking NFT ownership:', error);
        document.getElementById('result').innerText = `An error occurred while checking NFT ownership: ${error.message}`;
    }
});
