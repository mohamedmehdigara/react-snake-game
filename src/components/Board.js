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
  
    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { x: newSnake[0].x, y: newSnake[0].y };
  
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
  
      newSnake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFoodPosition());
      } else {
        newSnake.pop();
      }
  
      if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize ||
        newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      }
  
      setSnake(newSnake);
    };
  
    const gameInterval = setInterval(moveSnake, 200);
  
    return () => {
      clearInterval(gameInterval);
    };
  }, [snake, direction, isGameStarted, food]);
  
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
