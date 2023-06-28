import { Col, Row } from "react-bootstrap";
import ChessGame from "./Chessgame";

const Home:React.FC = () =>{
    return (
      <>
      <Row>
        <Col xs md={1} lg={2}></Col>
        <Col xs={12} md={7} lg={6}><ChessGame /></Col>
        <Col xs md={4} lg={4} >
            <div className="infobox">

            </div>

        </Col>
      </Row>

      </>
    );
  }
  
  export default Home;