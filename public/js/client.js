const socket = io();

// Load orders on connect
socket.on('orders', (orders) => {
  renderOrders(orders);
});

socket.on('new_order', (order) => {
  renderOrder(order);
});

socket.on('status_updated', (data) => {
  const el = document.getElementById(`order-${data.id}`);
  if (el) el.querySelector('.status').textContent = data.status;
});

function renderOrders(orders) {
  const container = document.getElementById('orders');
  container.innerHTML = '';
  orders.forEach(order => renderOrder(order));
}

function renderOrder(order) {
  const container = document.getElementById('orders');
  const div = document.createElement('div');
  div.id = `order-${order.id}`;
  div.innerHTML = `
    <strong>Table ${order.table_number}</strong>
    <p>Items: ${order.items.length}</p>
    <p>Total: $${order.total.toFixed(2)}</p>
    <span class="status">${order.status}</span>
    <button onclick="markReady(${order.id})">Mark Ready</button>
  `;
  container.appendChild(div);
}

function markReady(id) {
  socket.emit('update_status', id, 'ready');
}