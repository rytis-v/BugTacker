import React from "react";
import { Card, Button } from "react-bootstrap";
import { deleteTicket } from "../services/BugTrackerApi";
import SearchModal from "./SearchModal";

  
  function TicketItem(ticket){
    
    function handleDelete(itemToDeleteId){
        let newArray = ticket.ticketArray.filter(item => item.id !== itemToDeleteId);
        deleteTicket(itemToDeleteId);
        ticket.setTicketsArray(newArray);
      }
    return (
      <Card className="mt-2 ms-4 d-inline-flex" border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{ticket.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {ticket.priority === 0 ? "No priority"
                : ticket.priority === 1 ? "Low priority"
                : ticket.priority === 2 ? "Medium priority"
                : ticket.priority === 3 ? "High priority"
                : ticket.priority === 4 ? "Extreme priority"
                : "Something went wrong" 
          }
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {ticket.status === 0 ? "Open" : "Closed"}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {ticket.dateCreated}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Ticket ID: {ticket.id}
          </Card.Subtitle>
          <Card.Text>
            {ticket.description}
          </Card.Text>
          <SearchModal searchValue={ticket.id} tickets={ticket.ticketArray} setTickets={ticket.setTicketsArray} buttonName="Update ticket"/>
          <Button className="ms-2" variant="outline-danger" onClick={() => (handleDelete(ticket.id))}>Delete ticket</Button>
        </Card.Body>
      </Card>
    );
  }

export default TicketItem;