import { useState } from "react";

interface Props{
    image? : string
    number : number
}

export default function Cells({number,image}:Props){

    const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

    let activePiece : HTMLElement; 
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
     activePiece = e.target as HTMLElement;
    activePiece.style.position="relative"
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.clientX -50;
    const y = e.clientY -50;
    setPosition({ x, y });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    activePiece.style.position=""
    setIsDragging(false);
  };


     if ((number%2)===0) {
                
               return(<div className="cell black">
                {image && <div
                className="piece"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{
                backgroundImage: `url(${image})`,
                  left: position.x,
                  top: position.y,
                }}
              ></div>}</div>)
            
            }else{
               
                return<div className="cell white">
                    {image && <div
                    className="piece"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{
                    backgroundImage: `url(${image})`,
                      left: position.x,
                      top: position.y,
                    }}
                  ></div>}</div>
                
            }
}