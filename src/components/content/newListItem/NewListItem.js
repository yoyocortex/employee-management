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
        let formData;
        if (this.props.contentType === 'employee') {
            formData = {
                fullname: this.state.fullname,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                category: this.state.category,
                salary: this.state.salary
            };
        } else if (this.props.contentType === 'category') {
            formData = {
                categoryname: this.state.categoryname
            };
        }
        this.props.onSubmitNew(formData);
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    };

    render() {
        return (
            <div className="modal fade" id="addListItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title create-new-emp-text">{this.props.contentType === 'employee' ? 'Create a new employee' : 'Create a new category'}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span className='modal-close' aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Container className='d-flex align-items-center justify-content-center border-none'>
                                <div className='w-100' style={{ maxWidth: "600px" }}>
                                    <Card className='new-employee-card'>
                                        <Card.Body>
                                            {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                                            <Form onSubmit={this.handleSubmit}>
                                                {this.props.contentType === 'employee' ?
                                                    <>
                                                        <Form.Group id="fullname">
                                                            <Form.Label>Fullname</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.fullname} name='fullname' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="email">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" onChange={this.handleInputChange} value={this.state.email} name='email' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="password">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" onChange={this.handleInputChange} value={this.state.password} name='password' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="address">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.address} name='address' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group id="category">
                                                            <Form.Label>Category</Form.Label>
                                                            <div className="dropdown">
                                                                <button className="dropdown-toggle dropdown-btn"
                                                                    type="button"
                                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.state.category}
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                                    {this.props.categories.map((cat) => (
                                                                        <button key={cat.id} className="dropdown-item" 
                                                                            onClick={this.handleInputChange} value={cat.categoryname} 
                                                                            name='category' type="button">{cat.categoryname}</button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            {/* <Form.Control type="text" onChange={this.handleInputChange} value={this.state.category} name='category' required></Form.Control> */}
                                                        </Form.Group>
                                                        <Form.Group id="salary">
                                                            <Form.Label>Salary</Form.Label>
                                                            <Form.Control type="numbers" onChange={this.handleInputChange} value={this.state.salary} name='salary' required></Form.Control>
                                                        </Form.Group>
                                                    </>
                                                    :
                                                    <>
                                                        <Form.Group id="categoryname">
                                                            <Form.Label>Category name</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.categoryname} name='categoryname' required></Form.Control>
                                                        </Form.Group>
                                                    </>
                                                }
                                                <div className="modal-footer">
                                                    {/* <button className='btn-create' data-dismiss="modal">Close</button> */}
                                                    <button className='btn-create' type="submit" disabled={this.state.loading}>Save changes</button>
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
