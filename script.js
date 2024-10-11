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
getImplementationAddress().then((implementationAddress) => {
    if (implementationAddress) {
        console.log(`Address of the logic contract: ${implementationAddress}`);
        // Anda bisa melanjutkan dengan menggunakan ABI dan address yang sesuai dengan kontrak logika
    }
});
