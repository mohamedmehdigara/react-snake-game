import React, { useState, useEffect } from 'react';
import Snake from './Snake';

const Board = () => {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, 200);
    document.addEventListener('keydown', handleKeyDown);

    // Initialize the snake with a single segment at the start of the game
    setSnake([{ x: 10, y: 10 }]);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]);

  const startGame = () => {
    setDirection('right');
    setGameOver(false);
    setScore(0);
  };

  const moveSnake = () => {
    if (gameOver) return;

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
    checkCollision(head);
    checkFood(head);
    checkBounds(head);
  };

  const handleKeyDown = (event) => {
    if (gameOver) return;

    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'down')
          setDirection('up');
        break;
      case 'ArrowDown':
        if (direction !== 'up')
          setDirection('down');
        break;
      case 'ArrowLeft':
        if (direction !== 'right')
          setDirection('left');
        break;
      case 'ArrowRight':
        if (direction !== 'left')
          setDirection('right');
        break;
      default:
        break;
    }
  };

  const checkCollision = (head) => {
    const body = snake.slice(1);

    if (body.some(segment => segment.x === head.x && segment.y === head.y))
      setGameOver(true);
  };

  const checkFood = (head) => {
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      growSnake();
      increaseScore();
    }
  };

  const checkBounds = (head) => {
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20)
      setGameOver(true);
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);

    return { x, y };
  };

  const growSnake = () => {
    const tail = { ...snake[snake.length - 1] };
    setSnake(prevSnake => [...prevSnake, tail]);
  };

  const increaseScore = () => {
    setScore(score + 1);
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
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <button onClick={startGame}>Restart</button>
        </div>
      ) : (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default Board;



