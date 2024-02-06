import React, { Component } from 'react';
import { Form, Card, Alert, Container } from 'react-bootstrap';

import './NewListItem.css';

export default class NewListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: false,
            fullname: "",
            email: "",
            password: "",
            address: "",
            category: "Category",
            salary: "",
            categoryname: ""
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {
            fullname,
            email,
            password,
            address,
            category,
            salary,
            categoryname
        } = this.state;

        const { contentType, onSubmitNew } = this.props;

        let formData;
        if (contentType === 'employee') {
            formData = {
                fullname: fullname,
                email: email,
                password: password,
                address: address,
                category: category,
                salary: salary
            };
        } else if (contentType === 'category') {
            formData = {
                categoryname: categoryname
            };
        }
        onSubmitNew(formData);
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    };

    render() {
        const {
            contentType,
            categories
        } = this.props;

        const {
            fullname,
            email,
            password,
            address,
            category,
            salary,
            categoryname,
            error,
            loading
        } = this.state;

        return (
            <div className="modal fade" id="addListItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title create-new-emp-text">{contentType === 'employee' ? 'Create a new employee' : 'Create a new category'}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span className='modal-close' aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Container className='d-flex align-items-center justify-content-center border-none'>
                                <div className='w-100' style={{ maxWidth: "600px" }}>
                                    <Card className='new-employee-card'>
                                        <Card.Body>
                                            {error && <Alert variant='danger'>{error}</Alert>}
                                            <Form onSubmit={this.handleSubmit}>
                                                {contentType === 'employee' ?
                                                    <>
                                                        <Form.Group id="fullname">
                                                            <Form.Label>Fullname</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={fullname} name='fullname' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="email">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" onChange={this.handleInputChange} value={email} name='email' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="password">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" onChange={this.handleInputChange} value={password} name='password' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="address">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={address} name='address' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="category">
                                                            <Form.Label>Category</Form.Label>
                                                            <div className="dropdown">
                                                                <button className="dropdown-toggle dropdown-btn"
                                                                    type="button"
                                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {category}
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                                    {categories.map((cat) => (
                                                                        <button key={cat.id} className="dropdown-item"
                                                                            onClick={this.handleInputChange} value={cat.categoryname}
                                                                            name='category' type="button">{cat.categoryname}</button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Group id="salary">
                                                            <Form.Label>Salary</Form.Label>
                                                            <Form.Control type="numbers" onChange={this.handleInputChange} value={salary} name='salary' required></Form.Control>
                                                        </Form.Group>
                                                    </>
                                                    :
                                                    <>
                                                        <Form.Group id="categoryname">
                                                            <Form.Label>Category name</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={categoryname} name='categoryname' required></Form.Control>
                                                        </Form.Group>
                                                    </>
                                                }
                                                <div className="modal-footer">
                                                    <button className='btn-create' type="submit" disabled={loading}>Save changes</button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
