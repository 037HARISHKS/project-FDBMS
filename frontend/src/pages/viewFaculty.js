import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Container, Row, Alert } from "react-bootstrap";

const View = () => {
    const [faculty, setFaculty] = useState([]);
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });
    
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/facultydetails');
                if (response.status === 200) {
                    setFaculty(response.data);
                } 
                   
                
            } catch (error) {
                setStatus({ loading: false, success: false, error: error.message });
            }
        };

        fetchFaculty();
    }, []);

    const handleDelete = async (empid) => {
        try {
            setStatus({ loading: true, success: false, error: null });
            const response = await axios.delete('http://localhost:5000/api/delfac', {
                data: { facid: empid }
            });
            if (response.status === 200) {
                setStatus({ loading: false, success: true, error: null });
                
                setFaculty(faculty.filter(f => f._id !== empid));
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.message : 'Server error';
            setStatus({ loading: false, success: false, error: errorMessage });
        }
    };

    return (
        <>
            <h1>Faculty Details</h1>
            <Container>
                 
                {status.loading && <Alert variant="info">Deleting...</Alert>}
                {status.success && <Alert variant="success">Faculty deleted successfully.</Alert>}
                {status.error && <Alert variant="danger">{status.error}</Alert>}  
            
                {faculty.length > 0 ? (
                    <Row>
                        {faculty.map((facultyItem, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mt-4">
                                <h5>
                                    <strong>Name:</strong> {facultyItem.name}
                                </h5>
                                <h5>
                                    <strong>Email:</strong> {facultyItem.email}
                                </h5>
                                <h5>
                                    <strong>Employee ID:</strong> {facultyItem.empId}
                                </h5>
                                <button
                                    style={{ width: '100%' }}
                                    onClick={() => handleDelete(facultyItem._id)}
                                >
                                    Delete
                                </button>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No faculty details found</p>
                )}
            </Container>
        </>
    );
};

export default View;