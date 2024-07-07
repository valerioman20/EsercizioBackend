// components/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log(`Fetching post with ID: ${id}`);
    fetch(`http://localhost:5001/api/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Post data:', data);
        setPost(data);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Img variant="top" src={post.cover} alt={post.title} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text>
            <small className="text-muted">By {post.author} | {post.readTime.value} {post.readTime.unit} read</small>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
