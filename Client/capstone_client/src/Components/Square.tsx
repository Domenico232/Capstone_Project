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

  export default Square