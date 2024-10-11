// Infura URL for Polygon Mainnet
const infuraUrl = 'https://polygon-mainnet.infura.io/v3/afd9253b37f84c958fdd3d2023f6af5c';
const nftContractAddress = "0x6d778a0f5e07c01211672F57f246166ccF6541C1"; // NFT Contract Address
const tokenId = 1135; // The specific token ID you're checking for

// Create a Web3 instance using Web3.js v1.6.1 (loaded via CDN)
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// ABI (Application Binary Interface) for the NFT contract (ERC721 standard)
const nftABI = [
    {
        "constant": true,
        "inputs": [{ "name": "tokenId", "type": "uint256" }],
        "name": "ownerOf",
        "outputs": [{ "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Event listener for form submission
document.getElementById('nftForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cryptoAddress = document.getElementById('cryptoAddress').value;

    // Validate the crypto address
    if (!web3.utils.isAddress(cryptoAddress)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Address',
            text: 'Please enter a valid Polygon address!',
        });
        return;
    }

    try {
        // Create contract instance
        const contract = new web3.eth.Contract(nftABI, nftContractAddress);

        // Call the ownerOf method to check ownership of the specific token ID
        const owner = await contract.methods.ownerOf(tokenId).call();

        // Check if the input address matches the owner of the specific NFT
        if (owner.toLowerCase() === cryptoAddress.toLowerCase()) {
            // If the address owns the NFT, show success and redirect
            Swal.fire({
                title: 'Success!',
                text: 'You are eligible for the tournament. Click "Next" to register.',
                icon: 'success',
                confirmButtonText: 'Next'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "form.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Not Eligible',
                text: 'The address does not own the specified NFT.',
            });
        }
    } catch (error) {
        console.error('Error checking NFT ownership:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `An error occurred: ${error.message}`,
        });
    }
});
