import React from 'react';
import { Container, Row, Col,Accordion,Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const DisplayCertificates = () => {
    const {currentUser} = useSelector(state => state.user);

    const certificates =  currentUser.data.certifications ;
    
    // [
    //     {title:'Certificate 1', imgSrc: "certificate1.jpg", description: "Certificate 1 description goes here." },
    //     {title:'Certificate 2',imgSrc: "certificate2.jpg", description: "Certificate 2 description goes here." },
    //     {title:'Certificate 3',imgSrc: "certificate3.jpg", description: "Certificate 3 description goes here." },
    //     {title:'Certificate 4',imgSrc: "certificate4.jpg", description: "Certificate 4 description goes here." },
    //     {title:'Certificate 5',imgSrc: "certificate5.jpg", description: "Certificate 5 description goes here. Certificate 5 description goes here. Certificate 5 description goes here Certificate 5 description goes here." },
    // ];

    return (
        <Container fluid>
            <Row>
                <h1 className='font-weight-bold px-4'>Certificates</h1>
                <hr/>
            </Row>
            <Accordion>
                {certificates.map((cert, index) => (
                    <Accordion.Item eventKey={index} key={index} className='mt-3 mb-3'>
                    <Accordion.Header>{cert.name}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                <Col><Image src={`http://localhost:5000/uploads/${cert.fileId}`} rounded/></Col>
                                <Col><p>{cert.duration}</p></Col>
                                <Col><p>{cert.description}</p></Col>
                            </Row>
                        </Container>
                    </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );

};

export default DisplayCertificates;