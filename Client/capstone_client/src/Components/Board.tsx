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
pieces.push({image : "", x:1, y:7})

export default function Board(){
    let board = [];
    for (let j:number = yAxis.length-1; j >=0 ; j--) {
    for (let i:number = 0; i < xAxis.length; i++) {
            const number= i+j+2
            let image = undefined;
            pieces.forEach(p=>{
                if (p.x === j && p.y===i) {
                    image = p.image
                }
            });
            board.push(<Cells image={image} number={number} />);
            
        }
        
    }
    return(
    <div className="chessboard">
        {board}
    </div>
    )

}
