const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001; // You can use any available port

app.use(cors({
  origin: 'http://localhost:3000'
}));
// Parse incoming JSON data
app.use(bodyParser.json());

// In-memory data store
let items = [];

// CRUD operations


// Create a new item
app.post('/api/items', (req, res) => {
 
  
 
  
    const newItem = {
        id: Date.now().toString(), // You can still include an 'id' field if you want.
        ...req.body, // Use spread operator to include all other properties from the request body.
      };        
   
  
    items.push(newItem);
    res.status(201).json(newItem);
  });

// Read all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Read a single item by ID
app.get('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Update an existing item
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
  
    const index = items.findIndex((item) => item.id === itemId);
    if (index === -1) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      // Merge the existing item with the updated properties from the request body
      const updatedItem = {
        ...items[index], // Preserve existing properties
        ...req.body,     // Merge with updated properties from request body
      };
  
      items[index] = updatedItem;
      res.json(updatedItem);
    }
  });

// Delete an item by ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = items.findIndex((item) => item.id === itemId);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});