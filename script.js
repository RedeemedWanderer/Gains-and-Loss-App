async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected:', accounts[0]);
            document.getElementById('connectButton').innerText = 'Wallet Connected';
            fetchPortfolio(accounts[0]);
        } catch (error) {
            console.error('User rejected the request.');
        }
    } else {
        alert('Please install MetaMask!');
    }
}

async function fetchPortfolio(account) {
    // Simulate fetching portfolio data
    const portfolio = [
        { crypto: 'Bitcoin', amount: 1.5, price: 30000 },
        { crypto: 'Ethereum', amount: 10, price: 2000 }
    ];
    displayPortfolio(portfolio);
}

function displayPortfolio(portfolio) {
    const portfolioDiv = document.getElementById('portfolio');
    portfolioDiv.innerHTML = '';
    let totalValue = 0;

    portfolio.forEach(holding => {
        const value = holding.amount * holding.price;
        totalValue += value;
        portfolioDiv.innerHTML += `<div>${holding.amount} ${holding.crypto} - $${value.toFixed(2)}</div>`;
    });

    document.getElementById('portfolioValue').innerText = totalValue.toFixed(2);
}

function calculateProjection() {
    const crypto = document.getElementById('crypto').value;
    const currentAmount = parseFloat(document.getElementById('currentAmount').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);

    if (!isNaN(currentAmount) && !isNaN(targetPrice) && currentAmount > 0 && targetPrice > 0) {
        const projectedValue = currentAmount * targetPrice;
        document.getElementById('projectionResult').innerText = `Projected Value: $${projectedValue.toFixed(2)}`;
    } else {
        alert('Please enter valid amounts');
    }
}

document.getElementById('connectButton').addEventListener('click', connectWallet);
