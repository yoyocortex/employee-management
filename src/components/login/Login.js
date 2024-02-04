import React, { useState } from 'react';
import { Form, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login(props) {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(loginForm.email, loginForm.password).then((result) => {
            setError('');
            setLoading(true);
            navigate('/');
        }).catch ((error) => {
            setError('Failed to sign in.');
        });
    setLoading(false);
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(previousState => {
        return { ...previousState, [name]: value }
    });
}

return (
    <Container className='d-flex align-items-center justify-content-center' style={{ height: "100%" }}>
        <div className='w-100' style={{ maxWidth: "400px" }}>
            <Card className='login-card' id={props.style}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Login</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email' value={loginForm.email} onChange={(e) => handleChange(e)} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={loginForm.password} onChange={(e) => handleChange(e)} required></Form.Control>
                        </Form.Group>
                        <button className='btn-login' disabled={loading} type="submit" id={props.style}>Submit</button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'>Signup</Link>
            </div>
        </div>
    </Container>
);
}