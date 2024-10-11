// Infura URL for Polygon Mainnet
const infuraUrl = 'https://polygon-mainnet.infura.io/v3/afd9253b37f84c958fdd3d2023f6af5c';
const proxyContractAddress = "0x6d778a0f5e07c01211672F57f246166ccF6541C1"; // Proxy Contract Address

// ABI untuk proxy contract yang diberikan
const proxyABI = [
    {
        "inputs": [],
        "name": "implementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Create a Web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Fungsi untuk mendapatkan address kontrak logika
async function getImplementationAddress() {
    try {
        const contract = new web3.eth.Contract(proxyABI, proxyContractAddress);
        const implementationAddress = await contract.methods.implementation().call();
        console.log("Implementation Contract Address:", implementationAddress);
        return implementationAddress;
    } catch (error) {
        console.error("Error getting implementation address:", error);
        return null;
    }
}

// Panggil fungsi ini untuk mendapatkan address dari kontrak logika
getImplementationAddress().then(async (implementationAddress) => {
    if (implementationAddress) {
        console.log(`Address of the logic contract: ${implementationAddress}`);
        // ABI dari kontrak logika ERC-721 (misalnya balanceOf)
        const nftABI = [
            // ERC721 function: balanceOf(address owner)
            {
                "constant": true,
                "inputs": [{ "name": "owner", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "name": "", "type": "uint256" }],
                "type": "function"
            }
        ];

        document.getElementById('nftForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const cryptoAddress = document.getElementById('cryptoAddress').value;

            // Check if cryptoAddress is a valid Ethereum/Polygon address
            if (!web3.utils.isAddress(cryptoAddress)) {
                document.getElementById('result').innerText = "Invalid crypto address. Please enter a valid Polygon address.";
                return;
            }

            try {
                // Check if the crypto address owns any NFTs from the logic contract address
                const contract = new web3.eth.Contract(nftABI, implementationAddress);
                const balance = await contract.methods.balanceOf(cryptoAddress).call();

                if (balance > 0) {
                    // Jika balance lebih dari 0, tampilkan SweetAlert dan redirect ke form.html
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
    }
});
