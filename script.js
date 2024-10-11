// Infura URL for Polygon Mainnet
const infuraUrl = 'https://polygon-mainnet.infura.io/v3/afd9253b37f84c958fdd3d2023f6af5c';
const nftContractAddress = "0x6d778a0f5e07c01211672F57f246166ccF6541C1"; // Address of the NFT contract you're checking

// Create a Web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// ABI (Application Binary Interface) for the NFT contract (ERC721 standard)
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
    
    try {
        // Check if the crypto address owns any NFTs from the contract address
        const contract = new web3.eth.Contract(nftABI, nftContractAddress);
        const balance = await contract.methods.balanceOf(cryptoAddress).call();

        if (balance > 0) {
            // Redirect to form.html if the address owns the NFT
            window.location.href = "form.html";
        } else {
            document.getElementById('result').innerText = "Address does not own the specified NFT on Polygon.";
        }
    } catch (error) {
        console.error('Error checking NFT ownership:', error);
        document.getElementById('result').innerText = "An error occurred while checking NFT ownership.";
    }
});
