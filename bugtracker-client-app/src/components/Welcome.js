import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import cuteBug from '../cuteBug.jpg';

function Welcome() {
    return (
        <div className="welcome">
            <h1>Welcome to my first attempt at a bug tracker application!</h1>
            <h3>If nothing breaks, you should be able to:</h3>
            <Container>
            <ListGroup>
                <ListGroupItem variant="primary">Retrieve all existing tickets from the database.</ListGroupItem>
                <ListGroupItem variant="success">Create new tickets.</ListGroupItem>
                <ListGroupItem variant="primary">Retrieve ticket from the database using it's ID.</ListGroupItem>
                <ListGroupItem variant="warning">Update existing tickets.</ListGroupItem>
                <ListGroupItem variant="danger">Delete tickets from the database.</ListGroupItem>
            </ListGroup>
            </Container>
            <img width="1000" height="550" src={cuteBug} alt="it's a bug"/>
        </div>
    );
  }
  
  export default Welcome;