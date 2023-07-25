import { Container, Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import "./assets.componets.style/navbar.css"
const NavbarTop:React.FC = () =>{
  return (
    <Navbar expand="xl" className="topBar fixed-top ">
         <Container>
        <Navbar.Brand >ChillChess</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >Home</Nav.Link>
            <Nav.Link >Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;