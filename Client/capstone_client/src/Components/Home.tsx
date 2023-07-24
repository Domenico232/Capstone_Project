
import { useEffect, useState } from "react";
import ChessGame from "./Chessgame";
import { useLocation } from "react-router-dom";
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



const Home:React.FC = () =>{
  
  const [playerData, setplayerData] = useState<ChessPlayer>();
  const location = useLocation();
  const pathname = location.pathname;
  const userName = pathname.split('/')[2];

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
    fetchData(userName);
  }, []);


    return (
      <>

          <ChessGame />
            <div className="infobox">
              {playerData && <div>{playerData.lastName}</div>}
            </div>


      </>
    );
  }
  
  export default Home;