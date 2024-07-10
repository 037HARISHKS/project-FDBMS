import React from 'react'
import { Accordion, Container,Row,Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';



function Patents() {
 
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)

    const patents= currentUser.data.patents;
    
    // [
    //     {title:'Patent 1',p_no:'03AA5g677H',description:'Patent 1 Description goes here',dop:'31 May 2005'},
    //     {title:'Patent 2',p_no:'03A44BC6H7',description:'Patent 2 Description goes here',dop:'19 Jul 2005'},
    //     {title:'Patent 3',p_no:'09KLJ76GT5',description:'Patent 3 Description goes here',dop:'15 Aug 2008'},
    //     {title:'Patent 4',p_no:'08HY5GR78S',description:'Patent 4 Description goes here',dop:'28 Jan 2011'},
    //     {title:'Patent 5',p_no:'MA2552RRYL',description:'Patent 5 Description goes here',dop:'08 Dec 2016'},
    //     {title:'Patent 6',p_no:'7H7L93D59L',description:'Patent 6 Description goes here',dop:'29 Sep 2020'},
    // ];

  return (
    <Container fluid className='vh-100'>
        <Row>
            <h1 className='font-weight-bold display-3 px-3'>PATENTS</h1>
        </Row>
     <Accordion>
        {patents.map((patent,index)=>(
            <Accordion.Item eventKey={index} key={currentUser.data.patents._id} className='mt-3 mb-3'>
                <Accordion.Header>{patent.title}</Accordion.Header>
                <Accordion.Body>
                    <Row>
                    <Col style={{width:'20%'}}><strong>Patent No: </strong></Col>
                    <Col>{patent.p_no}</Col>
                    </Row>
                    <Row>
                    <Col style={{width:'20%'}}><strong>Description: </strong></Col>
                    <Col>{patent.description}</Col>
                    </Row>
                    <Row>
                    <Col style={{width:'20%'}}><strong>Date of Publishing: </strong></Col>
                    <Col>{patent.dop}</Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        ))}
     </Accordion>
     <Row className='d-flex justify-content-center'>
        <Button variant='primary' onClick={()=>navigate('/patentform')} style={{width:'25%',minWidth:'150px'}}>Add Patent</Button>
     </Row>
    </Container>
  )
}

export default Patents