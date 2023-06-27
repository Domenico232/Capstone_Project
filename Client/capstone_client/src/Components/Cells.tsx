
interface Props{
    image? : string
    number : number
}

export default function Cells({number,image}:Props){

     if ((number%2)===0) {
                
                return <span className="cell black">{image? <img className="piece" src={image} alt="piece" />: <></>}</span>
            
            }else{
               
                return<span className="cell white">{image? <img className="piece" src={image} alt="piece" />: <></>}</span>
                
            }
}