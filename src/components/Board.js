import React, { useEffect, useRef, useState } from 'react';
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
  background-color: #222;
`;

const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #fff;
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
  color: #fff;
`;

const Board = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('right');
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [head, setHead] = useState([]);

  const boardRef = useRef();

  useEffect(() => {
    if (!isGameStarted) return;

    const handleKeyDown = (event) => {
      const { key } = event;
      if (key === 'ArrowUp' && direction !== 'down') setDirection('up');
      else if (key === 'ArrowDown' && direction !== 'up') setDirection('down');
      else if (key === 'ArrowLeft' && direction !== 'right') setDirection('left');
      else if (key === 'ArrowRight' && direction !== 'left') setDirection('right');
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, isGameStarted]);

  useEffect(() => {
    if (!isGameStarted) return;

    const moveSnake = () => {
      // Snake movement logic here

      const boardSize = 20;
      if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize ||
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      }
    };

    const gameInterval = setInterval(moveSnake, 200);

    return () => {
      clearInterval(gameInterval);
    };
  }, [snake, direction, isGameStarted]);

  const generateFoodPosition = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y };
  };

  const renderSnake = () => {
    return snake.map((segment, index) => (
      <SnakeSegment key={index} style={{ top: `${segment.y * 20}px`, left: `${segment.x * 20}px` }} />
    ));
  };

  const renderFood = () => {
    return <Food style={{ top: `${food.y * 20}px`, left: `${food.x * 20}px` }} />;
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    setGameOver(false); // Reset game over state
  };

  return (
    <BoardWrapper>
      <BoardContainer ref={boardRef}>
        {renderSnake()}
        {renderFood()}
        {gameOver && <GameOverMessage>Game Over</GameOverMessage>}
      </BoardContainer>
      {!isGameStarted && <button onClick={handleStartGame}>Start Game</button>}
    </BoardWrapper>
  );
};

export default Board;
