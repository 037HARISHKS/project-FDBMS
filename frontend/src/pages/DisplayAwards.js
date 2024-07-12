import React from 'react';
import { Container, Row, Col, Accordion, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Displayaward() {
    const { currentUser } = useSelector(state => state.user);
    const awards = currentUser.data.awards;

    return (
        <Container fluid>
            <Row>
                <h1 className='font-weight-bold px-4'>Awards</h1>
                <hr />
            </Row>
            <Accordion>
                {awards.map((award, index) => (
                    <Accordion.Item eventKey={index} key={index} className='mt-3 mb-3'>
                        <Accordion.Header>{award.name}</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                
                                <Col><Image src={`http://localhost:5000/uploads/${award.fileId}`} rounded/></Col>
                                <Col><p>{award.date}</p></Col>
                                <Col><p>{award.organization}</p></Col>
                                <Col><p>{award.issuer}</p></Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

export default Displayaward;