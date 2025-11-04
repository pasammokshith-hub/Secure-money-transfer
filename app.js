const API_URL = 'http://localhost:3000/api';

const setupBtn = document.getElementById('setupBtn');
const transferBtn = document.getElementById('transferBtn');
const userList = document.getElementById('userList');
const output = document.getElementById('output');

async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();
  userList.innerHTML = users
    .map(u => `<p><strong>${u.name}:</strong> $${u.balance}</p>`)
    .join('');
}

// Initialize with balances
fetchUsers();

// Create sample users
setupBtn.addEventListener('click', async () => {
  await fetch(`${API_URL}/setup`, { method: 'POST' });
  fetchUsers();
  output.textContent = '✅ Sample users created.';
});

// Perform transfer
transferBtn.addEventListener('click', async () => {
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const amount = parseFloat(document.getElementById('amount').value);

  const res = await fetch(`${API_URL}/transfer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, amount })
  });

  const data = await res.json();
  if (res.ok) {
    output.textContent = `✅ ${data.message}`;
    fetchUsers();
  } else {
    output.textContent = `❌ ${data.message}`;
  }
});
