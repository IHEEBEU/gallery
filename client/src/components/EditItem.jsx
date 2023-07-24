import React, { useState } from 'react';

const EditItem = ({ item, editItem }) => {
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      id: item.id,
      imageUrl,
      title,
      description,
    };
    editItem(updatedItem);
  };

  return (
    <div className="edit-item">
      <h2>Edit Image</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditItem;