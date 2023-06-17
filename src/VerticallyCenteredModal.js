import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const VerticallyCenteredModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Here, you can implement the logic to save the form data to the database by admins
    // For example, you can use an API call or any other data storage mechanism

    // Reset the form fields
    setMemberName('');
    setDescription('');
    setStartDate('');
    setEndDate('');

    // Close the modal
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleModalShow}>
        Open Modal
      </Button>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Team Member Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="memberName">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter member name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerticallyCenteredModal;
