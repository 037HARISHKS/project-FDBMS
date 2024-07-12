import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row,Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux'; // Add this import

function Addaward() {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);

    const awards = currentUser.data.awards;

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <Carousel>
                            {awards.map((award, index) => (
                                <Carousel.Item key={award._id} interval={1000}>
                                    <Image src={`http://localhost:5000/uploads/${award.fileId}`} rounded/>
                                    <Carousel.Caption>
                                        <h3>{award.name}</h3>
                                        <p>{award.date}</p>
                                        <p>{award.issue}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={() => navigate('/awardform')} style={{ width: '25%', minWidth: '250px' }}>Add Award</Button>
                </Row>
            </Container>
        </>
    );
}

export default Addaward;