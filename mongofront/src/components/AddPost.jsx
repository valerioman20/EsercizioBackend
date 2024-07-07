// components/AddPost.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Assicurati di importare Alert

export default function AddPost() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    cover: '',
    readTimeValue: '',
    readTimeUnit: '',
    author: '',
    content: ''
  });
  
  const [deleteId, setDeleteId] = useState('');
  const [message, setMessage] = useState(''); // Stato per il messaggio di notifica
  const [messageType, setMessageType] = useState('info'); // Stato per il tipo di messaggio

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteChange = (e) => {
    setDeleteId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5001/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        readTime: {
          value: formData.readTimeValue,
          unit: formData.readTimeUnit
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        setFormData({
          category: '',
          title: '',
          cover: '',
          readTimeValue: '',
          readTimeUnit: '',
          author: '',
          content: ''
        });
        setMessageType('success');
        setMessage('Post aggiunto con successo!');
      })
      .catch(error => {
        console.error(error);
        setMessageType('danger');
        setMessage('Errore nell\'aggiunta del post.');
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:5001/api/posts/${deleteId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella cancellazione del post.');
      }
      return response.json();
    })
    .then(data => {
      console.log("Post deleted:", data);
      setDeleteId('');
      setMessageType('success');
      setMessage('Il tuo post è stato eliminato!'); // Aggiorna il messaggio di notifica
    })
    .catch(error => {
      console.error(error);
      setMessageType('danger');
      setMessage('Errore nella cancellazione del post.');
    });
  };

  return (
    <Container>
      <h1 className="my-4">Add New Article</h1>
      {message && <Alert variant={messageType}>{message}</Alert>} {/* Visualizza il messaggio di notifica */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formCover">
          <Form.Label>Cover URL</Form.Label>
          <Form.Control type="text" name="cover" placeholder="Cover URL" value={formData.cover} onChange={handleChange} required />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formReadTimeValue">
              <Form.Label>Read Time Value</Form.Label>
              <Form.Control type="number" name="readTimeValue" placeholder="Read Time Value" value={formData.readTimeValue} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formReadTimeUnit">
              <Form.Label>Read Time Unit</Form.Label>
              <Form.Control type="text" name="readTimeUnit" placeholder="Read Time Unit" value={formData.readTimeUnit} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" placeholder="Content" value={formData.content} onChange={handleChange} required rows={5} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Article
        </Button>
      </Form>
      
      <h2 className="my-4">Delete Article</h2>
      <Form.Group controlId="formDeleteId">
        <Form.Label>Article ID</Form.Label>
        <Form.Control type="text" placeholder="Enter Article ID to delete" value={deleteId} onChange={handleDeleteChange} />
      </Form.Group>
      <Button variant="danger" onClick={handleDelete} className="mt-2">
        Delete Article
      </Button>
    </Container>
  );
}
