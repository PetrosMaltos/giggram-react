// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Для обработки JSON в теле запросов

// Массив для хранения заказов (вместо базы данных)
let orders = [];

// Создание нового заказа
app.post('/orders', (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Получение всех заказов
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
