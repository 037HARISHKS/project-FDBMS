import React from 'react';

import { useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Eventpage() {
  
  const {currentUser} = useSelector(state => state.user);
  const events = currentUser.data.events 
  

  // Debugging output
  console.log('Current User:', currentUser);
  console.log('Events:', events);

  return (
    <Container className='mt-5 mb-5' style={{ width: '100%' }}>
      <Container>
        <Row className='text-center'>
          <Col>
            <h1>EVENTS ORGANIZED BY {currentUser.data.name}</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container>
        {events.length > 0 ? (
          events.map((event, index) => (
            <Row className='mt-5 mb-5 slide-in-left' key={index}>
              <Col xs={12} md={4} className='d-flex justify-content-center'>
                <Image
                  src={`http://localhost:5000/uploads/${event.image}`}
                  style={{ borderRadius: '20px', maxWidth: '100%', height: 'auto' }}
                  alt={event.eventname}
                />
              </Col>
              <Col xs={12} md={8} className='mt-4'>
                <h5><strong>NAME:</strong> {event.name}</h5>
                <h5><strong>DESCRIPTION:</strong> {event.description}</h5>
                <h5><strong>DATE:</strong> {event.date}</h5>
              </Col>
            </Row>
          ))
        ) : (
          <Row className='text-center'>
            <Col>
              <p>No events found.</p>
            </Col>
          </Row>
        )}
      </Container>
      
    </Container>
  );
}

export default Eventpage;