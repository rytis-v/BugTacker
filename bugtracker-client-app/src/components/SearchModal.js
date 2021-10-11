import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getTicketById, updateTicket } from "../services/BugTrackerApi";

function SearchModal({ searchValue, buttonName, tickets, setTickets }) {
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getTicketById(searchValue).then((res) => setTicket(res));
  };

  const handleUpdate = () => {
    updateTicket(ticket);
    let newArray = tickets.map(item =>item.id === ticket.id ? {...item, title: ticket.title, description: ticket.description, status: ticket.status, priority: ticket.priority}: item);
    setTickets(newArray);
    console.log(newArray)
    handleClose();
  }

  return (
    <>
      <Button className="me-2" variant="outline-primary" onClick={handleShow}>
        {buttonName}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {ticket ? (
            <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={ticket.title}
                  type="text"
                  placeholder="Enter title"
                  onChange={(e) =>
                    setTicket({ ...ticket, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={ticket.description}
                  as="textarea"
                  rows={3}
                  placeholder="Please enter detailed description of the issue encountered."
                  onChange={(e) =>
                    setTicket({ ...ticket, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Label>Priority: </Form.Label>
              <Form.Select
                value={ticket.priority}
                aria-label="priority"
                onChange={(e) =>
                  setTicket({ ...ticket, priority: parseInt(e.target.value) })
                }
              >
                <option value="0">No priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Extreme</option>
              </Form.Select>
              <Form.Label>Status: </Form.Label>
              <Form.Select
                value={ticket.status}
                aria-label="status"
                onChange={(e) =>
                  setTicket({ ...ticket, status: parseInt(e.target.value) })
                }
              >
                <option value="0">Open</option>
                <option value="1">Closed</option>
              </Form.Select>
            </Form>
          )
          : <h2>No ticket found with ID: {searchValue}</h2>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchModal;
