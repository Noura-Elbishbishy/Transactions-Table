let data = {
  customers: [],
  transactions: []
};

async function fetchData() {
  try { //fetch data
    const customersResponse = await fetch('http://localhost:3000/customers');
    const transactionsResponse = await fetch('http://localhost:3000/transactions');

    if (!customersResponse.ok || !transactionsResponse.ok) { //for developing if there is any error a3rf.
      throw new Error('Failed to fetch data');
    }
    data.customers = await customersResponse.json();
    data.transactions = await transactionsResponse.json();

    displayTransactions(data.transactions);
    generateChart(1); // Call generateChart after data is fetched
  } catch (error) {
    console.error('Error fetching data:', error); //bardo 3lshan law fe error a3rf
  }
}
//============= display table function ===========
function displayTransactions(transactions) { 
  const tableBody = document.getElementById('TableBody');
  tableBody.innerHTML = '';

  transactions.forEach(transaction => {
    const customer = data.customers.find(c => c.id === transaction.customer_id); // awl customer (3n try2 al id bta3o) al 3mly al transaction de
    if (customer) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.name}</td>
        <td>${transaction.date}</td>
        <td>${transaction.amount}</td>
      `;
      tableBody.appendChild(row);
    }
  });
}


//============= Search function ===========

document.getElementById('search').addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase(); //bykhod elly etktb fe al input ,step1
  const filteredTransactions = data.transactions.filter(transaction => { //filtering b2a ,step2
    const customer = data.customers.find(c => c.id === transaction.customer_id);
    return customer.name.toLowerCase().includes(searchTerm) ||
      transaction.amount.toString().includes(searchTerm);
  });
  displayTransactions(filteredTransactions);
});

// Generate chart using Chart.js
function generateChart(customerId) {
  const customerTransactions = data.transactions.filter(transaction => transaction.customer_id === customerId);
  const ctx = document.getElementById('transactionChart').getContext('2d');
  const chartData = {
    labels: customerTransactions.map(transaction => transaction.date),
    datasets: [{
      label: 'Transaction Amount',
      data: customerTransactions.map(transaction => transaction.amount),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      scales: { 
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

fetchData(); // Fetch data when the page loads



function deleteTransaction(transactionId) {
  data.transactions = data.transactions.filter(transaction => transaction.id !== transactionId);
  displayTransactions(data.transactions);
}

document.getElementById('search').addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredTransactions = data.transactions.filter(transaction => {
    const customer = data.customers.find(c => c.id === transaction.customer_id);
    return customer.name.toLowerCase().includes(searchTerm) ||
      transaction.amount.toString().includes(searchTerm);
  });
  displayTransactions(filteredTransactions);
});

function generateChart(customerId) {
  const customerTransactions = data.transactions.filter(transaction => transaction.customer_id === customerId);
  const ctx = document.getElementById('transactionChart').getContext('2d');
  const chartData = {
    labels: customerTransactions.map(transaction => transaction.date),
    datasets: [{
      label: 'Transaction Amount',
      data: customerTransactions.map(transaction => transaction.amount),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      scales: { 
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

fetchData(); // Fetch data when the page loads