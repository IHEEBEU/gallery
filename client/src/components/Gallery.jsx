import React from 'react';

const Gallery = ({ items, onEdit, onDelete }) => {
  return (
    <div className="gallery">
      {items.map((item) => (
        <div key={item.id} className="gallery-item">
          <img className='gallery-pic' src={item.imageUrl} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="butt">
          <button className="butt1" onClick={() => onEdit(item)}>Edit</button>
          <button className="butt2"onClick={() => onDelete(item.id)}>Delete</button>
          </div>        
        </div>
      ))}
    </div>
  );
};

export default Gallery;