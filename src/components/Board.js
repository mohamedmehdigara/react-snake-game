import React, { useState, useEffect } from 'react';
import Snake from './Snake';

const Board = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
      default:
        break;
    }

    newSnake.unshift(head);
    newSnake.pop();
    setSnake(newSnake);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setDirection('up');
        break;
      case 'ArrowDown':
        setDirection('down');
        break;
      case 'ArrowLeft':
        setDirection('left');
        break;
      case 'ArrowRight':
        setDirection('right');
        break;
      default:
        break;
    }
  };

  return (
    <div className="board">
      {snake.map((segment, index) => (
        <Snake key={index} x={segment.x} y={segment.y} />
      ))}
      <div
        className="food"
        style={{ top: `${food.y * 20}px`, left: `${food.x * 20}px` }}
      ></div>
    </div>
  );
};

export default Board;
