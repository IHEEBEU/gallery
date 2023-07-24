import React from 'react';

const DeleteItem = ({ item, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(item.id);
  };

};

export default DeleteItem;