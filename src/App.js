import React, { useState } from "react";
import "./App.css";

function App() {
  const choices = [
    { name: "Stone", emoji: "🪨" },
    { name: "Paper", emoji: "📄" },
    { name: "Scissors", emoji: "✂️" },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [message, setMessage] = useState("Choose your move! 🎮");
  const [gameEnded, setGameEnded] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const decideWinner = (player, computer) => {
    if (player.name === computer.name) {
      setResult("It's a Draw! 🤝");
      setMessage("So close! Try again 💫");
      return;
    }

    const winConditions = {
      Stone: "Scissors",
      Paper: "Stone",
      Scissors: "Paper",
    };

    if (winConditions[player.name] === computer.name) {
      setResult("You Win! 🎉");
      setMessage("Yay! You're on fire 🔥");
      setPlayerScore((prev) => prev + 1);
    } else {
      setResult("You Lose! 😢");
      setMessage("Aww, better luck next time 🌸");
      setComputerScore((prev) => prev + 1);
    }
  };

  const handlePlayerChoice = (choice) => {
    if (gameEnded) return;
    const computer = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);
    decideWinner(choice, computer);
  };

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setPlayerScore(0);
    setComputerScore(0);
    setMessage("Choose your move! 🎮");
    setGameEnded(false);
    setWinnerMessage("");
  };

  const handleEndGame = () => {
    if (playerScore > computerScore) {
      setWinnerMessage("🏆 You are the Champion! 🏆");
    } else if (computerScore > playerScore) {
      setWinnerMessage("🤖 Computer Wins the Game! 🤖");
    } else {
      setWinnerMessage("🤝 It's a Tie Game! 🤝");
    }
    setGameEnded(true);
    setMessage("Game Over! Check the final result below 👇");
  };

  return (
    <div className="app-container">
      <div className="game-card">
        <h1 className="title">✨ Stone Paper Scissors ✨</h1>
        <p className="message">{message}</p>

        <div className="choices-container">
          {choices.map((choice) => (
            <button
              key={choice.name}
              className="choice-btn"
              onClick={() => handlePlayerChoice(choice)}
              disabled={gameEnded}
            >
              <span className="choice-emoji">{choice.emoji}</span>
              <span className="choice-name">{choice.name}</span>
            </button>
          ))}
        </div>

        {playerChoice && computerChoice && !gameEnded && (
          <div className="result-section">
            <div className="choices-display">
              <div className="choice-box">
                <p className="choice-label">Your Choice</p>
                <p className="choice-value">
                  {playerChoice.emoji} {playerChoice.name}
                </p>
              </div>
              <div className="choice-box">
                <p className="choice-label">Computer's Choice</p>
                <p className="choice-value">
                  {computerChoice.emoji} {computerChoice.name}
                </p>
              </div>
            </div>
            <h2 className="result-text">{result}</h2>
          </div>
        )}

        {gameEnded && (
          <div className="final-result-section">
            <h2 className="final-winner-text">{winnerMessage}</h2>
            <p className="final-score-text">
              Final Score — You: {playerScore} | Computer: {computerScore}
            </p>
          </div>
        )}

        <div className="score-board">
          <div className="score-item player-score">
            <p className="score-label">You</p>
            <p className="score-value">{playerScore}</p>
          </div>
          <div className="score-item computer-score">
            <p className="score-label">Computer</p>
            <p className="score-value">{computerScore}</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="reset-btn" onClick={handleReset}>
            🔄 Reset Game
          </button>
          <button
            className="end-btn"
            onClick={handleEndGame}
            disabled={gameEnded}
          >
            🏁 End Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;