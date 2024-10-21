// Example JavaScript to fetch price data and calculate total price

async function calculatePrice() {
    const item = document.getElementById('item').value.trim().toLowerCase();
    const quantity = parseFloat(document.getElementById('quantity').value);
    const resultDiv = document.getElementById('result');

    // Check for valid input
    if (!item || isNaN(quantity) || quantity <= 0) {
        resultDiv.innerHTML = `<p style="color: red;">Please enter a valid item and quantity.</p>`;
        return;
    }

    // Make the API request to get the price of the item from ScrapMonster
    try {
        const response = await fetch(`https://api.scrapmonster.com/getPrice?material=${item}`, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE', // Replace with your API key
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (!data.price) {
            resultDiv.innerHTML = `<p style="color: red;">Price information not available for "${item}".</p>`;
            return;
        }

        const pricePerKg = data.price; // Assuming the API returns price per kg
        const totalPrice = pricePerKg * quantity;

        // Display the calculated result
        resultDiv.innerHTML = `
            <p><strong>Item:</strong> ${item.charAt(0).toUpperCase() + item.slice(1)}</p>
            <p><strong>Quantity:</strong> ${quantity} kg</p>
            <p><strong>Price per kg:</strong> $${pricePerKg.toFixed(2)}</p>
            <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
        `;
    } catch (error) {
        console.error('Error fetching price:', error);
        resultDiv.innerHTML = `<p style="color: red;">There was an error fetching the price. Please try again later.</p>`;
    }
}
