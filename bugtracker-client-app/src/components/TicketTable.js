import React, { useState, useEffect } from 'react'
import TicketItem from './TicketItem';
import { Card, Container, Placeholder } from 'react-bootstrap';
import { getAllTickets } from '../services/BugTrackerApi';
import Navigation from './Navigation';

function TicketTable(){

  
  const [tickets, setTickets] = useState();
  useEffect(() => {
  getAllTickets().then(res => setTickets(res) )
   
  }, [])

  useEffect(() => {
    console.log(tickets)
  }, [tickets])
        return (
          <>
            <Navigation tickets={tickets} setTickets={setTickets}/>
            <Container>
              {tickets ? (
                tickets.map(function (ticket) {
                  return (
                    <TicketItem
                      ticketArray={tickets}
                      setTicketsArray={setTickets}
                      key={ticket.id}
                      id={ticket.id}
                      title={ticket.title}
                      description={ticket.description}
                      priority={ticket.priority}
                      status={ticket.status}
                      dateCreated={ticket.dateCreated.replace("T", " ").slice(0, 16)}
                    />
                  );
                })
              ) : (
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                      <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                      <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="warning" xs={6} />
                  </Card.Body>
                </Card>
              )}
            </Container>
          </>
        );
    }


export default TicketTable;