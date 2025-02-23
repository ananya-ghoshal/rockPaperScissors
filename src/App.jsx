import { useState } from "react";
import Rock from "./assets/icon-rock.svg";
import Paper from "./assets/icon-paper.svg";
import Scissors from "./assets/icon-scissors.svg";
import "./App.css";

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const choices = ["Rock", "Paper", "Scissors"];
  const images = { Rock, Paper, Scissors };

  const playGame = (choice) => {
    setUserChoice(choice);
    setComputerChoice(null);
    setResult("The house is choosing...🤔");
    let shuffleTimes = 5;
    let count = 0;
    const shuffleInterval = setInterval(() => {
      const computerRandomChoice = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(computerRandomChoice);
      count++;
      if (count == shuffleTimes) {
        clearInterval(shuffleInterval);
        const finalChoice = choices[Math.floor(Math.random() * 3)];
        setComputerChoice(finalChoice);
        determineWinner(choice, finalChoice);
      }
    }, 500);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a tie! 😐");
      return;
    }
    let message = "";

    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      if (user === "Rock" && computer === "Scissors") {
        message = "Rock smashes Scissors!";
      } else if (user === "Paper" && computer === "Rock") {
        message = "Paper covers Rock!";
      } else if (user === "Scissors" && computer === "Paper") {
        message = "Scissors cut Paper!";
      }

      setResult(`${message} You won. 🥳`);
      setScore((prevScore) => ({ ...prevScore, user: prevScore.user + 1 }));
    } else {
      if (computer === "Rock" && user === "Scissors") {
        message = "Rock smashes Scissors!";
      } else if (computer === "Paper" && user === "Rock") {
        message = "Paper covers Rock!";
      } else if (computer === "Scissors" && user === "Paper") {
        message = "Scissors cut Paper!";
      }

      setResult(`${message} You lost. 😔 `);
      setScore((prevScore) => ({
        ...prevScore,
        computer: prevScore.computer + 1,
      }));
    }
  };
  const playAgain = () => {
    setUserChoice(null);
    setComputerChoice(null);
  };
  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ user: 0, computer: 0 });
  };

  return (
    <div className="container">
      <h1>Rock Paper Scissors!</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            <img src={images[choice] || ""} />
          </button>
        ))}
      </div>

      <div className="results">
        <div className="options">
          <div className="optionsChosen">
            <h4>You picked :</h4>

            <img src={images[userChoice] || ""} />
          </div>
          <div className="optionsChosen">
            <h4> The house picked :</h4>
            <img src={images[computerChoice] || ""} />
          </div>
        </div>

        <div className="result">
          <h2>{result}</h2>
        </div>
        <div className="score_card">
          <h4>SCORE</h4>
          <div className="scores">
            <span>You : {score.user}</span>
            <span>House : {score.computer}</span>
          </div>
        </div>
        <div className="repeat_buttons">
          <button onClick={playAgain}>Play Again</button>
          <button onClick={resetGame}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
