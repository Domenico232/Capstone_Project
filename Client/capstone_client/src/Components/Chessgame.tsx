/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./assets.componets.style/board.css";
import Square from "./Square";
import { io } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

//white pieces
const wPawn: string =
  "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";
const wKnight: string =
  "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const wBishop: string =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const wRook: string =
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const wKing: string =
  "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
const wQueen: string =
  "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
//black pieces
const bPawn: string =
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";
const bKnight: string =
  "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";
const bBishop: string =
  "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
const bRook: string =
  "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";
const bKing: string =
  "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";
const bQueen: string =
  "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";
  interface ChessPlayer {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    lastName: string;
    dataInserimento: string;
    elo: number;
    nationality: string;
    roles: UserRole[];
  }interface UserRole {
    id: number;
    roleName: string;
  }



const ChessGame: React.FC  = () => {

  
  const [messages, setMessages] = useState<{ text: string; sender: string|undefined }[]>([]);
  const [inputValue, setInputValue] = useState('');
 
  const { userName, param2, borw } = useParams<{ userName: string; param2: string; borw: string }>();
  console.log("Black or White:", borw);
  const [playerData, setplayerData] = useState<ChessPlayer>();
  const [isYourTurn, setIsYourTurn] = useState<Boolean>(false);
  const [black, setblack] = useState<Boolean>(true);
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
  const [selectedPieces, setSelectedPiece] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const isItFirstTime: Array<Array<boolean | null>> = [
    // Starting Chessboard pawns
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
    [null, false, null, null, null, null, false, null],
  ];
  async function fetchData(url:String) {
    try {
      const response = await fetch(`http://localhost:8080/users/username/${url}`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta'); 
      }
  
      const data = await response.json(); 
     console.log(data)
     setplayerData(data);
     
    } catch (error:unknown) {
      console.error('Si è verificato un errore:', error);
      throw error;
    }
  }
  useEffect(() => {

    const socket = io('http://localhost:31337', {
      transports: ['websocket'],
    });

    console.log(borw)
    if (borw === "white") {
      setblack(false)
      setIsYourTurn(true)
    }
    fetchData(userName!);
    console.log('inUseEffect');
    // Connect to the Socket.io server
   
    socket.on('connect', () => {
      console.log('Connected to the Socket.io server');
      socket.emit("register-user", { userName }); // Registra il nome utente del client lato server
    });

    socket.on("message-recived", data => {
      console.log("message-recived",data)
      setMessages((prevMessages) => [...prevMessages, { text: data, sender: param2 }]);

    })

    // Ricevi gli eventi dal server
    socket.on('evento-server', data => {
     
      movePiece(data.row, data.col, data.newRow, data.newCol);
      console.log('Evento ricevuto dal server:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const handleMessageSend = () => {
    const socket = io('http://localhost:31337', {
      transports: ['websocket'],
    });

    if (inputValue.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: 'You' }]);
      const data = {
        recipient:param2,
        data:inputValue
      }
      socket.emit('message-sent', data)
      console.log(inputValue)
      setInputValue('');
    }
  };

  const handleSquareClick = (
    row: number,
    col: number,
    selectedPiece?: { row: number; col: number }
  ) => {
    console.log(row, col);
    console.log(selectedPiece || selectedPiece); // Utilizza il selectedPiece passato come argomento
  
    if (selectedPieces) {
      if (isMoveValid(selectedPieces.row, selectedPieces.col, row, col)) {
        movePiece(selectedPieces.row, selectedPieces.col, row, col);
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

  console.log("BOARDSTATE " + boardState);

  const renderSquare = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;
    const piece = boardState[row][col];
    let image = "";
    if (piece === "p") {
      image = wPawn;
    } else if (piece === "P") {
      image = bPawn;
    } else if (piece === "R") {
      image = bRook;
    } else if (piece === "r") {
      image = wRook;
    } else if (piece === "n") {
      image = wKnight;
    } else if (piece === "N") {
      image = bKnight;
    } else if (piece === "b") {
      image = wBishop;
    } else if (piece === "B") {
      image = bBishop;
    } else if (piece === "q") {
      image = wQueen;
    } else if (piece === "Q") {
      image = bQueen;
    } else if (piece === "k") {
      image = wKing;
    } else if (piece === "K") {
      image = bKing;
    } else {
      image = "";
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

  const isMoveValid = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    const piece = boardState[startRow][startCol];
    const pieceMove = boardState[endRow][endCol];
    if(isYourTurn){
      if (piece === "p") {
        if (black) {
          return false;
        }
        if (pieceMove === null) {
          if (!(startRow - endRow === 0)) {
            return false;
          }
          if (endCol > startCol) {
            return false;
          }
          if (isItFirstTime[startRow][startCol] === false) {
            if (startCol - endCol > 2) {
              return false;
            }
            isItFirstTime[startRow][startCol] = true;
          } else if (startCol - endCol > 1) {
            return false;
          }
    
          //if pawn go on populated cell
        } else {
          console.log("verify full cell_________________");
          console.log(startRow - endRow);
          console.log("&&");
          console.log(startCol - endCol);
    
          if (!(startRow - endRow === -1 && startCol - endCol === 1)) {
            if (startRow - endRow === 1 && startCol - endCol === 1) {
              return true;
            }
            return false;
          }
        }
      }else if (piece === "P") {
        if (!black) {
          return false
        }
      if (pieceMove === null) {
        if (!(startRow - endRow === 0)) {
          return false;
        }
        if (endCol < startCol) {
          return false;
        }
        if (isItFirstTime[startRow][startCol] === false) {
          if (startCol - endCol < -2) {
            return false;
          }
          isItFirstTime[startRow][startCol] = true;
        } else if (startCol - endCol < -1) {
          return false;
        }
        //if pawn go on populated cell
      } else {
        console.log("verify full cell_________________");
        console.log(startRow - endRow);
        console.log("&&");
        console.log(startCol - endCol);
    
        if (!(startRow - endRow === -1 && startCol - endCol === -1)) {
          if (startRow - endRow === 1 && startCol - endCol === -1) {
            return true;
          }
          return false;
        }
      }
    }
    }else{
      return false;
    }


  

return true;


      
  };

  const movePiece = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    console.log(startRow,startCol,endRow,endCol)
    const newBoardState = [...boardState];
    if (startRow!==undefined) {
      console.log(newBoardState);
    const piece = newBoardState[startRow][startCol];
    newBoardState[startRow][startCol] = null;
    newBoardState[endRow][endCol] = piece;
  
    const socket = io("http://localhost:31337", {
      transports: ["websocket"],
    });
    const eventData = {
      data: { row: selectedPieces?.row,col: selectedPieces?.col, newRow: endRow, newCol: endCol },
      recipient:param2,
    };
    console.log(eventData, "mossa inviata");
    socket.emit("evento-cliente", eventData);
    setIsYourTurn(!isYourTurn)
    setBoardState(newBoardState);
    }else{
      
    }
    
  };

  return (
    <>
    <Container fluid>
      <Row>
        <Col sm={12} md={12} lg={12} xxl={8}>
          <div className="chess-game">
            
            {renderBoard()}
            {isYourTurn ? <div className={!black ? "whitebox":"blackbox"}>your turn</div>: <div className={black ? "whitebox":"blackbox"} >Opponent turn</div>}
          </div>
        </Col>
        <Col sm={12} md={12} lg={12} xxl={4} className="d-flex justify-content-cente">
          <div className="infobox ">
          <ul className="messageList">
            <li className="lideco">mariong</li>
        {messages?.map((message, index) => (
          <li key={index}>{`${message.sender}: ${message.text}`}</li>
        ))}
      </ul>
            <div className="messageBox">
            {playerData && <div>{playerData.lastName}</div>}
     
      <input
        type="text"
        className="me-5 textboxcolor"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleMessageSend();
          }
        }}
      />
      <button className="btn btn-black" onClick={handleMessageSend}>Send</button>
    </div>
          </div>
        </Col>
      </Row>
    </Container>
  </>
);
};

export default ChessGame;


