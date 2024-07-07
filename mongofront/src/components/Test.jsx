import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

export default function Test() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:5001/api/users?page=${currentPage}&limit=10`)
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.users)) {
                    setUsers(data.users);
                    setCurrentPage(data.currentPage);
                    setTotalPages(data.totalPages);
                } else {
                    console.error("La risposta non è valida:", data);
                }
            })
            .catch(error => console.error(error));
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Autori</h1>
            <Row>
                {users.map((singleUser) => (
                    <Col key={singleUser._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={singleUser.avatar} alt={`${singleUser.name} ${singleUser.lastName}`} />
                            <Card.Body>
                                <Card.Title>{singleUser.name} {singleUser.lastName}</Card.Title>
                                <Card.Text>
                                    <p>Email: {singleUser.email}</p>
                                    <p>Data di nascita: {singleUser.birthday}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination className="d-flex justify-content-center mt-4">
                <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Pagina Precedente
                </Pagination.Prev>
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Pagina Successiva
                </Pagination.Next>
            </Pagination>
        </Container>
    );
}
