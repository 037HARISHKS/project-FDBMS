import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import '../styles/Subjects.css';
import { useSelector } from "react-redux";



const DisplaySubjects = () => {

    const {currentUser} = useSelector(state => state.user)

    const subjectCards = [
        { title: 'subject1-subjectcode', IAT1: 0, IAT2: 0, IAT3: 0, OddSem: 0 },
        { title: 'subject2-subjectcode', IAT1: 0, IAT2: 0, IAT3: 0, OddSem: 0 },
        { title: 'subject3-subjectcode', IAT1: 0, IAT2: 0, IAT3: 0, EvenSem: 0 },
        { title: 'subject4-subjectcode', IAT1: 0, IAT2: 0, IAT3: 0, EvenSem: 0 },
      ];  
  return (<div>
    <Container className="d-flex  px-4 mt-5"
    style={{ justifyContent: "center" }}>
        <Row className="text-center ">
            <Col>
            <h1>Subject Handle BY</h1>
            <h1 style={{fontSize:'30px',fontWeight:'bold'}}> {currentUser.data.name} </h1>
            <h2 style={{fontSize:'20px',fontWeight:'lighter'}}>{currentUser.data.educationalBackground}</h2>
            </Col>
        
        </Row>
    </Container>

    <Container className="mt-4">
      <Row>
        {subjectCards.map((subject, index) => (
          <Col key={index} md={6} className="card-container">
            <Card style={{ width: '200%' }}>
              <Card.Body>
                <Card.Title className="card-title">{subject.title.split('-')[0]}</Card.Title>
                <Card.Subtitle className="mb-2 card-subtitle">{subject.title.split('-')[1]}</Card.Subtitle>
                <Card.Text>
                  <p>Consider the Pass Percentage</p>
                  <p>Internal Assessment 1</p>
                  <ProgressBar
                    now={subject.IAT1}
                    label={`${subject.IAT1}`}
                    variant="info"
                  
                  />
                  <p>Internal Assessment 2</p>
                  <ProgressBar
                    now={subject.IAT2}
                    label={`${subject.IAT2}%`}
                    variant="info"
                    
                  />
                  <p>Internal Assessment 3</p>
                  <ProgressBar
                    now={subject.IAT3}
                    label={`${subject.IAT3}%`}
                    variant="info"
                    
                  />{subject.OddSem !== undefined && (
                    <>
                      <p>Odd Semester</p>
                      <ProgressBar
                        now={subject.OddSem}
                        label={`${subject.OddSem}%`}
                        striped
                        variant="warning"
                      />
                    </>
                  )}
                  {subject.EvenSem !== undefined && (
                    <>
                      <p>Even Semester</p>
                      <ProgressBar
                        now={subject.EvenSem}
                        label={`${subject.EvenSem}%`}
                        striped
                        variant="success"
                      />
                    </>
                  )}
                 </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default DisplaySubjects;
