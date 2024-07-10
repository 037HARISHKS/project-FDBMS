import React from 'react';
import { Accordion, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

function DisplayPatents() {
    const { currentUser } = useSelector(state => state.user);
    
    const patents = currentUser.data.patents;

    const handleViewPDF = (fileId) => {
        const url = `http://localhost:5000/uploads/${fileId}`;
        window.open(url, '_blank');
    };

    return (
        <Container fluid className='vh-100'>
            <Row>
                <h1 className='font-weight-bold display-3 px-3'>PATENTS</h1>
            </Row>
            <Accordion>
                {patents.map((patent, index) => (
                    <Accordion.Item eventKey={index.toString()} key={patent._id} className='mt-3 mb-3'>
                        <Accordion.Header>{patent.title}</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col style={{ width: '20%' }}><strong>Patent No: </strong></Col>
                                <Col>{patent.p_no}</Col>
                            </Row>
                            <Row>
                                <Col style={{ width: '20%' }}><strong>Description: </strong></Col>
                                <Col>{patent.description}</Col>
                            </Row>
                            <Row>
                                <Col style={{ width: '20%' }}><strong>Date of Publishing: </strong></Col>
                                <Col>{patent.dop}</Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        style={{ width: '25%', minWidth: '150px' }}
                                        onClick={() => handleViewPDF(patent.fileId)}
                                    >
                                        View PDF
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

export default DisplayPatents;
