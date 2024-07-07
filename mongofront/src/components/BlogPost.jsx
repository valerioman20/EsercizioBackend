// components/BlogPost.js
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5001/api/posts?page=${currentPage}&limit=10`)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
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
      <h1 className="my-4">Blog Posts</h1>
      <Row>
        {posts.map((post) => (
          <Col key={post._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Link to={`/post/${post._id}`}>
                <Card.Img variant="top" src={post.cover} alt={post.title} />
              </Link>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Card.Text>
                  <small className="text-muted">By {post.author} | {post.readTime.value} {post.readTime.unit} read</small>
                </Card.Text>
                <Link to={`/post/${post._id}`} className="btn btn-primary">Read More</Link>
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
