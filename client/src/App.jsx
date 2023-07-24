import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import CreateItem from './components/CreateItem';
import EditItem from './components/EditItem';
import DeleteItem from './components/DeleteItem';
import Header from "./components/Header"
import './App.css'

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch items from the server
    fetch('http://localhost:3001/api/items/')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const addItem = (newItem) => {
    // Implement the logic to add a new item to the server and update the state
    // For example:
    fetch('http://localhost:3001/api/items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => setItems([...items, data]))
      .catch((error) => console.error('Error adding item:', error));
  };

  const editItem = (updatedItem) => {
    // Implement the logic to update an existing item on the server and update the state
    // For example:
    fetch(`http://localhost:3001/api/items/${updatedItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = items.map((item) =>
          item.id === updatedItem.id ? data : item
        );
        setItems(updatedItems);
        setSelectedItem(null); // Close the edit form after saving
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  const deleteItem = (itemId) => {
    // Check if the item exists in the local state
    const itemToDelete = items.find((item) => item.id === itemId);
    if (!itemToDelete) {
      console.error('Item not found in the local state.');
      return;
    }

    // Make the DELETE request to the server
    fetch(`http://localhost:3001/api/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Remove the item from the local state after successful deletion
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
        setSelectedItem(null); // Close the delete confirmation after deleting
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };
  return (
    <div className="main--div">
      <Header />
      <CreateItem addItem={addItem} />
      <Gallery items={items} onEdit={handleEdit} onDelete={handleDelete} />
      {selectedItem && <EditItem item={selectedItem} editItem={editItem} />}
      {selectedItem && <DeleteItem item={selectedItem} deleteItem={handleDelete} />}
    </div>
  );
}

export default App