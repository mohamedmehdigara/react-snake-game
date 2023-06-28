import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
`;

const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #333;
`;

const Food = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
`;

const GameOverMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
`;

const initialSnake = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const initialFood = { x: 15, y: 15 };

const Board = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState('up');
  const [food, setFood] = useState(initialFood);
  const [gameOver, setGameOver] = useState(false);
  const boardRef = useRef(null);

  const handleStartGame = () => {
    setSnake(initialSnake);
    setDirection('up');
    setFood(initialFood);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowUp' && direction !== 'down') {
        setDirection('up');
      } else if (event.key === 'ArrowDown' && direction !== 'up') {
        setDirection('down');
      } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        setDirection('left');
      } else if (event.key === 'ArrowRight' && direction !== 'left') {
        setDirection('right');
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'up':
          head.y -= 1;
          break;
        case 'down':
          head.y += 1;
          break;
        case 'left':
          head.x -= 1;
          break;
        case 'right':
          head.x += 1;
          break;
        default:
          break;
      }

      if (
        head.x < 0 ||
        head.x >= 20 ||
        head.y < 0 ||
        head.y >= 20 ||
        newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 200);

    return () => {
      clearInterval(interval);
    };
  }, [snake, direction, food, gameOver]);

  const renderSnake = () =>
    snake.map((segment, index) => (
      <SnakeSegment
        key={index}
        style={{ top: `${segment.y * 20}px`, left: `${segment.x * 20}px` }}
      />
    ));

  const renderFood = () => (
    <Food style={{ top: `${food.y * 20}px`, left: `${food.x * 20}px` }} />
  );

  return (
    <BoardWrapper>
      <BoardContainer ref={boardRef}>
        {renderSnake()}
        {renderFood()}
        {gameOver && <GameOverMessage>Game Over</GameOverMessage>}
      </BoardContainer>
      {!gameOver && (
        <button onClick={handleStartGame} disabled={gameOver}>
          Start Game
        </button>
      )}
    </BoardWrapper>
  );
};

export default Board;
