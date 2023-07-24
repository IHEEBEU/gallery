import React, { useState } from 'react';

const CreateItem = ({ addItem }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      imageUrl,
      title,
      description,
    };
    addItem(newItem);
    setImageUrl('');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="create-item">
      <h2 className="create--title">Create New Image</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input type="text" value={imageUrl} placeholder='Enter the URL' onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} placeholder="Give it a Title" onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} placeholder="Give it a Description"onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateItem;