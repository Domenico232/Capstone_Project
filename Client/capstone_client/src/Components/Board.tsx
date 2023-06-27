import React from "react";
import Cells from "./Cells";
import "../styles/board.css"

const xAxis: Array<String> = ["a","b","c","d","e","f","g","h",];
const yAxis: Array<String> = ["1","2","3","4","5","6","7","8",];
interface Piece {
    x : number
    y : number
    image : string
}

const pieces: Piece[] = []
for (let e = 0; e < xAxis.length; e++) {    
    //pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg", x:e, y:6})
    pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg", x:e, y:1})
}
for (let e = 0; e < xAxis.length; e++) {    
    pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg", x:e, y:6})
}
//rooks
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg", x:7, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg", x:0, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg", x:0, y:0})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg", x:7, y:0})
//kingts
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg", x:1, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg", x:6, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg", x:1, y:0})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg", x:6, y:0})
//bishops
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg", x:5, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg", x:2, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg", x:5, y:0})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg", x:2, y:0})
//queens/kings
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg", x:4, y:7})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg", x:4, y:0})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg", x:3, y:0})
pieces.push({image : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg", x:3, y:7})

function movePiece(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log(e.target);
}

export default function Board(){
    let board = [];
    for (let j:number = yAxis.length-1; j >=0 ; j--) {
    for (let i:number = 0; i < xAxis.length; i++) {
            const number= i+j+2
            let image = undefined;
            pieces.forEach(p=>{
                if (p.x === i && p.y===j) {
                    image = p.image
                }
            });
            board.push(<Cells key={xAxis[i]+""+(j+1)} image={image} number={number} />);
            console.log(xAxis[i]+""+(j+1))
        }
        
    }
    return(
    <div onMouseDown={e => movePiece(e)} className="chessboard">
        {board}
    </div>
    )

}
