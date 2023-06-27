
interface Props{
    image? : string
    number : number
}

export default function Cells({number,image}:Props){

     if ((number%2)===0) {
                
                return <div className="cell black">{image&&<div className="piece" style={{backgroundImage: `url(${image})`}}></div>}</div>
            
            }else{
               
                return<div className="cell white">{image&&<div className="piece" style={{backgroundImage: `url(${image})`}}></div>}</div>
                
            }
}