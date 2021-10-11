import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { createTicket } from '../services/BugTrackerApi';


function CreateTicketModal() {
    const [show, setShow] = useState(false);
    const [formValues, setFormValues] = useState({title : "", description: "", priority: 0, status: 0});
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {createTicket(formValues); handleClose()};
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Create a ticket
        </Button>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" onChange={(e) => setFormValues({...formValues, title : e.target.value})}/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Please enter detailed description of the issue encountered."
                  onChange={(e) => setFormValues({...formValues, description : e.target.value})}
                />
              </Form.Group>
              <Form.Label>Priority: </Form.Label>
              <Form.Select aria-label="priority" onChange={(e) => setFormValues({...formValues, priority : parseInt(e.target.value)})}>
                <option value="0">No priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Extreme</option>
              </Form.Select>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default CreateTicketModal;