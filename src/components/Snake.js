import React from 'react';

const Snake = ({ x, y }) => {
  const style = {
    top: `${y * 20}px`,
    left: `${x * 20}px`,
  };

  return <div className="snake" style={style}></div>;
};

export default Snake;
