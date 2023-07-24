import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterDto {
  name: string;
  username: string;
  email: string;
  password: string;
  lastName: string;
  nationality: string;
  roles:String[]
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterDto>({
    name: '',
    username: '',
    email: '',
    password: '',
    lastName: '',
    nationality: '',
    roles:["user"]
  });

  const handleRegister = () => {
    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
          lastName: '',
          nationality: '',
          roles:[]
        });navigate("LoginPage")
      })
      .catch((error) => {
        console.log("non funziona",formData)
        console.error(error);
        navigate("LoginPage")
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <Row className='formStyle'>
      <Col sm={2} lg={4} md={3} />

      <Col sm={8} lg={4} md={6} className='formStyle1'>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="nationality">
            <Form.Label>Nationality:</Form.Label>
            <Form.Control type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit" className='my-4 mx-1 border-0'>
            Register
          </Button>
          <Link to="/LoginPage" className='links'>Arledy registered?</Link>
        </Form>

      </Col>
      <Col sm={2} lg={4} md={3} />
    </Row>
  );
};

export default RegisterPage;