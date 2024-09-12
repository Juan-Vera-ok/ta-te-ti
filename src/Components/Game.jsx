import Button from "./Button";
import { useState, useEffect } from "react";
import "../App.css";

export default function Game() {
  const [turno, setTurno] = useState("Circle");
  const [botones, setBotones] = useState(Array(9).fill("")); // Un array de 9 elementos vacío
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        botones[a] !== "" &&
        botones[a] === botones[b] &&
        botones[a] === botones[c]
      ) {
        setWinner(turno);
        return; // Salir de la función si se ha encontrado un ganador
      }
    }

    // Verifica si hay empate (no hay más espacios vacíos)
    if (!botones.includes("")) {
      setWinner("Empate");
    }
  };

  const handleOnClick = (index) => {
    if (botones[index] === "" && winner === null) { // Solo actualiza si el botón está vacío y no hay ganador
      const nuevosBotones = [...botones];
      nuevosBotones[index] = turno;
      setBotones(nuevosBotones);
    }
  };

  // Usar useEffect para ejecutar checkWinner cuando el estado de botones cambie
  useEffect(() => {
    if (winner === null) { // Solo ejecuta si no hay un ganador aún
      checkWinner();
    }
  }, [botones, turno, winner]); // Dependencias: se ejecuta cuando botones, turno o winner cambian

  // Cambia el turno solo si no hay un ganador
  useEffect(() => {
    if (winner === null) {
      setTurno(turno === "X" ? "Circle" : "X");
    }
  }, [botones]); // Cambia el turno cada vez que los botones cambian

  return (
    <div className="div__game-container">
      <div className="div__turno-actual">Es el turno de: {turno}</div>
      <div className="game">
        {botones.map((simbolo, index) => (
          <Button
            key={index}
            simbol={simbolo}
            onClick={() => handleOnClick(index)}
          />
        ))}
      </div>
      <h1>{winner ? `Ganador: ${winner}` : "Juego en progreso"}</h1>
    </div>
  );
}
