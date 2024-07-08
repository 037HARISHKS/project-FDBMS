import React from 'react';
import { Container, Row, Col, Button,Accordion,Image } from 'react-bootstrap';

import {useNavigate} from 'react-router-dom';


const Certificates = () => {


    const navigate = useNavigate(); 

    const handleUploadCertificate = () => {
        navigate('/certificate-upload'); 
    };
    const certificates = [
        {title:'Certificate 1', imgSrc: "certificate1.jpg", description: "Certificate 1 description goes here." },
        {title:'Certificate 2',imgSrc: "certificate2.jpg", description: "Certificate 2 description goes here." },
        {title:'Certificate 3',imgSrc: "certificate3.jpg", description: "Certificate 3 description goes here." },
        {title:'Certificate 4',imgSrc: "certificate4.jpg", description: "Certificate 4 description goes here." },
        {title:'Certificate 5',imgSrc: "certificate5.jpg", description: "Certificate 5 description goes here. Certificate 5 description goes here. Certificate 5 description goes here Certificate 5 description goes here." },
    ];

    return (
        <Container fluid>
            <Accordion>
                {certificates.map((cert, index) => (
                    <Accordion.Item eventKey={index} key={index} className='mt-3 mb-3'>
                    <Accordion.Header>{cert.title}</Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Row>
                                <Col><Image src={cert.imgSrc}/></Col>
                                <Col><p>{cert.description}</p></Col>
                            </Row>
                        </Container>
                    </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Button className="mt-3 md-4 sm-2"  variant='primary' style={{ width: '20%',minWidth:'300px' }} onClick={handleUploadCertificate}>Add a new certificate</Button>
                    </Row>
                </Container>
            </Container>
    );

};

export default Certificates;