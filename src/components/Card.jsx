import React from 'react';

const Card = ({ item }) => {
  const imageUrl = item['poster-image'] ? `https://test.create.diagnal.com/images/${item['poster-image']}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
  return (
    <div className="card" tabIndex={0}>
      <img src={imageUrl} alt={item.name || 'Poster'} onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'; }} />
      <p>{item.name}</p>
    </div>
  );
};

export default Card;