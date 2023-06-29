import React, { useState } from "react";
import "./assets.componets.style/board.css"
import Square from "./Square";
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


const ChessGame: React.FC = () => {
    const [boardState, setBoardState] = useState<Array<Array<string | null>>>([
       // Starting Chessboard
        ["R", "P", null, null, null, null, "p", "r"],
        ["N", "P", null, null, null, null, "p", "n"],
        ["B", "P", null, null, null, null, "p", "b"],
        ["Q", "P", null, null, null, null, "p", "q"],
        ["K", "P", null, null, null, null, "p", "k"],
        ["B", "P", null, null, null, null, "p", "b"],
        ["N", "P", null, null, null, null, "p", "n"],
        ["R", "P", null, null, null, null, "p", "r"],
      ]);
const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
const isItFirstTime : Array<Array<boolean | null>> =[
       // Starting Chessboard pawns
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
        [null, false, null, null, null, null, false,null],
    ];

    const goOn = () =>{

            fakeMove(1,1);
            fakeMove(1,2);
       

    }

    const fakeMove = (newRow: number, newCol:number) =>{
        handleSquareClick(newRow, newCol);
    }
    

    const handleSquareClick = (row: number, col: number) => {
        console.log(row, col);
        console.log(selectedPiece);
        
        if (selectedPiece) {
          if (isMoveValid(selectedPiece.row, selectedPiece.col, row, col)) {
            movePiece(selectedPiece.row, selectedPiece.col, row, col);
        }
        setSelectedPiece(null); 
        } else {
          const piece = boardState[row][col];
          console.log(piece);
          if (piece !== null) {
            setSelectedPiece({ row, col });
          }
        }
      };

console.log("BOARDSTATE "+boardState);

const renderSquare = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;
        const piece = boardState[row][col];
            let image = "";
        if (piece === "p") {
            image = wPawn;
        }else if(piece === "P"){
            image = bPawn;
        }else if(piece === "R"){
            image = bRook;
        }else if(piece === "r"){
            image = wRook;
        }else if(piece === "n"){
            image = wKnight;
        }else if(piece === "N"){
            image = bKnight;
        }else if(piece === "b"){
            image = wBishop;
        }else if(piece === "B"){
            image = bBishop;
        }else if(piece === "q"){
            image = wQueen;
        }else if(piece === "Q"){
            image = bQueen;
        }else if(piece === "k"){
            image = wKing;
        }else if(piece === "K"){
            image = bKing;
        }else{
            image="";
        }
        return (
            <Square
          key={`${row}-${col}`}
          isBlack={isBlack}
          piece={piece}
          image={image}
          onClick={() => handleSquareClick(row, col)}
          />
          );
        };

        const renderBoard = () => {
            const rows = boardState.map((row, rowIndex) => (
                <div className="chessrow" key={rowIndex}>
              {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}

            </div>
          ));
          return <div className="boardes">{rows}</div>;
        };

        const isMoveValid = (startRow: number, startCol: number, endRow: number, endCol: number) => {
            const piece = boardState[startRow][startCol]
            const pieceMove = boardState[endRow][endCol]
            if (piece==="p") {
                    if (pieceMove===null) {
                        if (!(startRow-endRow===0)) {
                            return false;
                        }
                        if (endCol>startCol) {
                            return false
                        }
                        if (isItFirstTime[startRow][startCol]===false) {
                            
                            if(startCol-endCol>2) {
                                return false
                            }
                            isItFirstTime[startRow][startCol]=true;
                        } else if (startCol-endCol>1){
                            return false
                        }
                        
                         //if pawn go on populated cell
                    }else{
                        console.log("verify full cell_________________")
                        console.log((startRow-endRow))
                        console.log("&&")
                        console.log((startCol-endCol))
    
                        if (!(startRow-endRow===-1 && startCol-endCol===1)) {
                            if ((startRow-endRow===1 && startCol-endCol===1)) {
                                return true
                            }
                            return false     
                        } 
                        
                    }
                
           
      }else if (piece==="P") {
        if (pieceMove===null) {
            if (!(startRow-endRow===0)) {
                return false;
            }
            if (endCol<startCol) {
                return false
            }
            if(startCol-endCol<-2) {
                    return false
             }
             //if pawn go on populated cell
        }else{
            console.log("verify full cell_________________")
            console.log((startRow-endRow))
            console.log("&&")
            console.log((startCol-endCol))

            if (!(startRow-endRow===-1 && startCol-endCol===-1)) {
                if ((startRow-endRow===1 && startCol-endCol===-1)) {
                    return true
                }
                return false     
            } 
            
        }
      }

          return true;
        };
      
        const movePiece = (startRow: number, startCol: number, endRow: number, endCol: number) => {
          const newBoardState = [...boardState];
          console.log(newBoardState);
          const piece = newBoardState[startRow][startCol];
          newBoardState[startRow][startCol] = null;
          newBoardState[endRow][endCol] = piece;
          setBoardState(newBoardState);
        };




    return (
      <div className="chess-game">
        <h1 onClick={goOn}>Chess Game</h1>
        {renderBoard()}
      </div>
    );
  };

export default ChessGame;