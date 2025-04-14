async function convertCurrency() {
    const currency = document.getElementById('fromCurrency').value;
    const amount = document.getElementById('amount').value;
    const resultArea = document.getElementById('resultArea');

    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${currency}-BRL`);
        const data = await response.json();
        
        let rate, convertedValue;
        
        if (currency === 'USD') {
            rate = data.USDBRL.bid;
            convertedValue = (amount * rate).toFixed(2);
        } else if (currency === 'BTC') {
            rate = data.BTCBRL.bid;
            convertedValue = (amount * rate).toFixed(2);
        }

        document.getElementById('convertedAmount').textContent = `R$ ${convertedValue}`;
        document.getElementById('currentRate').textContent = `1 ${currency} = R$ ${parseFloat(rate).toFixed(2)}`;
        document.getElementById('lastUpdate').textContent = new Date().toLocaleString();

    } catch (error) {
        console.error('Erro na conversão:', error);
        resultArea.textContent = 'Erro ao buscar cotação. Tente novamente.';
    }
}

