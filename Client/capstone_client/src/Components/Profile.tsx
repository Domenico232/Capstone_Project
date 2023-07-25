/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { io } from "socket.io-client";

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
}

interface UserRole {
  id: number;
  roleName: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const userName = pathname.split('/')[2];

  const [usersChallengers, setUsersChallengers] = useState<Array<String>>([])

  const socket = io('http://localhost:31337', {
    transports: ['websocket'],
  });
  // Replace this with your actual user data
  const [userData, setUserData] = useState<ChessPlayer>( {
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    lastName: "",
    dataInserimento: "",
    elo: 0,
    nationality: "",
    roles: [{ id: 0, roleName: "" }],
  });
  const [friendsList, setFriendsList] = useState<Array<ChessPlayer> | null>(null);


  async function fetchUsers() {
    try {
      const response = await fetch(`http://localhost:8080/users`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta'); 
      }
  
      const data = await response.json(); 
     console.log(data)
     setFriendsList(data);
     
    } catch (error:unknown) {
      console.error('Si è verificato un errore:', error);
      throw error;
    }
  }

  async function fetchUser(name:String) {
    try {
      const response = await fetch(`http://localhost:8080/users/username/${name}`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta'); 
      }
  
     const data = await response.json(); 
     console.log(data)
     setUserData(data);
     
    } catch (error:unknown) {
      console.error('Si è verificato un errore:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchUser(userName);
    console.log('inUseEffect');
    // Connect to the Socket.io server
    const socket = io('http://localhost:31337', {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('Connected to the Socket.io server');
      socket.emit("register-user", { userName }); // Registra il nome utente del client lato server
    });

    socket.on('invite-received', (data) =>{
      console.log(data)
      setUsersChallengers([...usersChallengers, data.senderUsername])
    });

    socket.on('start-game', (data)=>{
      console.log("StartGame",data);
      navigate(`/chessgame/${userName}/${data}/black`);
    }); 

    return () => {
      socket.disconnect();
    };
  }, []);

  function challenge(nome:String): void {
   const inviteData = {
    senderUsername: userData.username,
    recipientUsername: nome,
  };
  socket.emit('send-invite', inviteData);

  }

  function acceptedChallenge(acceptChallenger: String): void {
    const acceptData = {
      recipient:acceptChallenger,
      data:userName
    }
    socket.emit('challenge-accepted', acceptData);
    navigate(`/chessgame/${userName}/${acceptChallenger}/white`);
  }

  return (
    <Container className="profile-container mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <header className="d-flex align-items-center justify-content-center">
            <Image
              className="header-image"
              src="path/to/dummy-image.png"
              alt="Dummy Image"
            />
            <h1 className="text-center">{userData.username}</h1>
          </header>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col xs={12} md={6}>
          <div className="profile-info paragraph">
            
            <p className="h5">Name: {userData.name}</p>
            <p className="h5">Last Name: {userData.lastName}</p>
            <p className="h5">Email: {userData.email}</p>
            <p className="h5">{userData.elo} Elo</p>
          </div>
        </Col>

        <Col xs={12} md={6}>
        {usersChallengers && usersChallengers.map((singleChallenge,i)=> (
          <div className="profile-info paragraph" key={i}>
            
            <p className="h5 mx-2">{singleChallenge}</p>
            <p className="h5">Challenged You! <button className="btn btn-black" onClick={()=>acceptedChallenge(singleChallenge)}>Accept</button> <button className="btn btn-warning" onClick={()=>setUsersChallengers([])}>Decline</button></p>

          </div>
            ))}
            </Col>

        <Col xs={12} md={6}>
          <div className="friends-list paragraph">
            
            {friendsList? <ul>
                <h2>Player List</h2>
              {friendsList?.map((friend) => (
                <li key={friend.id}>
                  <span className="h5">
                    {friend.name} ({friend.username})
                  </span>{" "}
                  <Button className="btn btn-black" onClick={() => challenge(friend.username)}>Invite to Play</Button>
                </li>
              ))}
            </ul>:<></>}
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};



export default Profile;