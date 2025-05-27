import React from 'react';
import Card from './Card';
import useWindowSize from '../hooks/useWindowSize';

const Grid = ({ data }) => {
  const { isPortrait } = useWindowSize();
  const columnCount = isPortrait ? 3 : 5;

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
      {data.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
};

export default Grid;