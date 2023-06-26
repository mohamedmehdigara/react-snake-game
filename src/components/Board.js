import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

/* eslint-disable no-undef */



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
  border: 2px solid #ccc;
`;

const snakeHeadAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #333;
  ${(props) =>
    props.isHead &&
    css`
      animation: ${snakeHeadAnimation} 0.2s infinite;
    `}
`;

const Food = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ff0000;
`;

const GameOverMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const Board = () => {
  // Rest of the code...
  const [snake, setSnake] = useState([]); // Initialize snake as an empty array
  const [food, setFood] = useState([]);
  const [gameOver, setGameOver] = useState([]);

  const renderSnake = () => {
    return snake.map((segment, index) => (
      <SnakeSegment
        key={index}
        style={{ top: `${segment.y * 20}px`, left: `${segment.x * 20}px` }}
        isHead={index === 0}
      />
    ));
  };

  return (
    <BoardWrapper>
      <BoardContainer>
        {renderSnake()}
        <Food style={{ top: `${food.y * 20}px`, left: `${food.x * 20}px` }} />
        {gameOver && <GameOverMessage>Game Over!</GameOverMessage>}
      </BoardContainer>
    </BoardWrapper>
  );
};

export default Board;

