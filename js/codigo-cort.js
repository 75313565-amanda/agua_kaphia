// Checkout -> create order
app.post('/api/checkout', async (req, res) => {
  await db.read();
  const { cartId, customer } = req.body; // customer: { name, phone }

  // Verificamos que el carrito exista
  const cart = db.data.carts.find(c => c.id === cartId);
  if (!cart) return res.status(400).json({ error: 'Invalid cart' });

  // Crear orden
  const order = {
    id: nanoid(10),
    cart,
    customer,
    status: 'pending',
    createdAt: Date.now()
  };

  db.data.orders.push(order);
  await db.write();

  res.json({ message: 'Order created', order });
});

// Listar órdenes (admin)
app.get('/api/orders', async (req, res) => {
  await db.read();
  res.json(db.data.orders);
});

// Iniciar servidor
initDB().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log('API Mock running on http://localhost:' + PORT);
  });
});
