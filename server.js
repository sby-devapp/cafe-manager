// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./data/cafe.db');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_number TEXT,
      items TEXT,
      total REAL,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Routes
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send all existing orders to new client
  db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
    if (!err) socket.emit('orders', rows);
  });

  // Listen for new order from frontend
  socket.on('new_order', (order) => {
    db.run(
      'INSERT INTO orders (table_number, items, total, status) VALUES (?, ?, ?, ?)',
      [order.table, JSON.stringify(order.items), order.total, 'new'],
      (err) => {
        if (err) return console.error(err);
        io.emit('new_order', order); // Broadcast to all clients
      }
    );
  });

  // Handle status update
  socket.on('update_status', (id, status) => {
    db.run(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id],
      (err) => {
        if (err) return console.error(err);
        io.emit('status_updated', { id, status });
      }
    );
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const { validateLicense } = require('./utils/license');
if (!validateLicense()) {
  console.error('Invalid license. Aborting.');
  process.exit(1);
}