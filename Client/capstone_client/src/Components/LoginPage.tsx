import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface LoginDto {
  username: string;
  password: string;
}
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginDto>({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    fetch('http://localhost:8080/api/auth/login', {
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
          username: '',
          password: '',
        });
        localStorage.setItem('token', data.accessToken);
        console.log(data.username)
        navigate(`/Home/${data.username}`);
      })
      .catch((error) => {
        console.error(error);
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
    handleLogin();
  };

  return (
    <Row className='formStyle'>
      <Col sm={2} lg={4} md={3} />

      <Col sm={8} lg={4} md={6} className='formStyle1'>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Button style={{background:"white"}} variant="primary" type="submit" className='my-4 mx-1 border-0'>
            Login
          </Button>
          <Link to="/RegisterPage" className='links'>Not registered yet?</Link>
        </Form>
      </Col>
      <Col sm={2} lg={4} md={3} />
    </Row>
  );
};

export default LoginPage;