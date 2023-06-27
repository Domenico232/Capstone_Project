import React, { useState } from "react";
import "../styles/board.css"
//white pieces
const wPawn:string="https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
const wKnight:string="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const wBishop:string="https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const wRook:string="https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const wKing:string="https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
const wQueen:string="https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";

//black pieces
const bPawn:string="https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
const bKnight:string="https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";
const bBishop:string="https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
const bRook:string="https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";
const bKing:string="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";
const bQueen:string="https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";

interface SquareProps {
  isBlack: boolean;
  piece: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ isBlack, piece, onClick }) => {
  const color = isBlack ? "black" : "white";
  return (
    <div className={`square ${color}`} onClick={onClick}>
      {piece && <img className="piece" src={piece} alt="piece" />}
    </div>
  );
};
const ChessGame: React.FC = () => {
   const [boardState, setBoardState] = useState<Array<Array<string | null>>>([
        // Inizializzazione della scacchiera
        [bRook, bKnight, bBishop, bQueen, bKing, bBishop, bKnight, bRook],
        [bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn],
        [wRook, wKnight, wBishop, wQueen, wKing, wBishop, wKnight, wRook],
      ]);
  
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  
    const handleSquareClick = (row: number, col: number) => {
      if (selectedPiece) {
        // Se è stato selezionato un pezzo, controlla se la mossa è valida
        if (isMoveValid(selectedPiece.row, selectedPiece.col, row, col)) {
          movePiece(selectedPiece.row, selectedPiece.col, row, col);
        }
        setSelectedPiece(null); // Deseleziona il pezzo
      } else {
        // Altrimenti, seleziona il pezzo se presente nella cella cliccata
        const piece = boardState[row][col];
        if (piece !== null) {
          setSelectedPiece({ row, col });
        }
      }
    };
  
    const isMoveValid = (startRow: number, startCol: number, endRow: number, endCol: number) => {
      // Implementa la logica di validazione delle mosse qui
      // Restituisci true se la mossa è valida, altrimenti false
      // Esempio: controlla se la mossa rispetta le regole degli scacchi
      // - Puoi utilizzare la matrice boardState per controllare le posizioni dei pezzi
      // - startRow, startCol sono le coordinate iniziali del pezzo
      // - endRow, endCol sono le coordinate di destinazione della mossa
      return true; // Da sostituire con la tua logica di validazione delle mosse
    };
  
    const movePiece = (startRow: number, startCol: number, endRow: number, endCol: number) => {
      // Esegui la mossa effettiva e aggiorna lo stato della scacchiera
      const newBoardState = [...boardState];
      const piece = newBoardState[startRow][startCol];
      newBoardState[startRow][startCol] = null;
      newBoardState[endRow][endCol] = piece;
      setBoardState(newBoardState);
    };
  
    const renderSquare = (row: number, col: number) => {
      const isBlack = (row + col) % 2 === 1;
      const piece = boardState[row][col];
  
      return (
        <Square
          key={`${row}-${col}`}
          isBlack={isBlack}
          piece={piece}
          onClick={() => handleSquareClick(row, col)}
        />
      );
    };
  
    const renderBoard = () => {
      const rows = boardState.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
        </div>
      ));
      return <div className="board">{rows}</div>;
    };
  
    return (
      <div className="chess-game">
        <h1>Chess Game</h1>
        {renderBoard()}
      </div>
    );
  };

export default ChessGame;