import React, { Component } from 'react';
import { Form, Card, Alert, Container } from 'react-bootstrap';
import './EditListItem.css';

export default class EditListItem extends Component {
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
            id: "",
            close: false,
            categoryname: ""
        }
    }

    componentDidMount = () => {
        const keys = Object.keys(this.props.list);
        const values = Object.values(this.props.list);
        for (let index = 0; index < values.length; index++) {
            this.setState({ [keys[index]]: values[index] });
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
        console.log(this.props.update(this.state.id, formData));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    };

    handleClose = (e) => {
        e.preventDefault();
        this.setState({ close: true });
        this.props.handleChangeCloseProps();
    };

    render() {
        return (
            <div className={this.props.open === true && this.state.close === false ? "modal fade show" : "modal fade"}
                id="editListItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                aria-hidden={this.props.open === true && this.state.close === false ? "false" : "true"}
                style={{ display: this.props.open === true && this.state.close === false ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header" id={this.props.style}>
                            <h5 className="modal-title" id={this.props.style}>{this.props.contentType === 'employee' ? 'Edit an employee' : 'Edit a category'}</h5>
                            <button type="button" id={this.props.style} onClick={this.handleClose} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id={this.props.style}>
                            <Container className='d-flex align-items-center justify-content-center border-none'>
                                <div className='w-100' style={{ maxWidth: "600px" }}>
                                    <Card className="edit-list-item-card" id={this.props.style}>
                                        <Card.Body>
                                            {this.state.error && <Alert variant='danger'>{this.state.error}</Alert>}
                                            <Form>
                                                {this.props.contentType === 'employee' ?
                                                    <>
                                                        <Form.Group className='form-group' id="fullname">
                                                            <Form.Label>Fullname</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.fullname} name='fullname' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="email">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" onChange={this.handleInputChange} value={this.state.email} name='email' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="password">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" onChange={this.handleInputChange} value={this.state.password} name='password' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="address">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.address} name='address' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="category">
                                                            <Form.Label>Category</Form.Label>
                                                            <div className="dropdown" style={{width: '100%'}}>
                                                                <button className="dropdown-toggle dropdown-btn"
                                                                    type="button" id={this.props.style}
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
                                                        <Form.Group className='form-group' id="salary">
                                                            <Form.Label>Salary</Form.Label>
                                                            <Form.Control type="numbers" onChange={this.handleInputChange} value={this.state.salary} name='salary' required></Form.Control>
                                                        </Form.Group>
                                                    </>
                                                    :
                                                    <Form.Group id="categoryname">
                                                        <Form.Label>Category name</Form.Label>
                                                        <Form.Control type="text" onChange={this.handleInputChange} value={this.state.categoryname} name='categoryname' required></Form.Control>
                                                    </Form.Group>
                                                }
                                                <div className="modal-footer">
                                                    {/* <button className='btn-create' id={this.props.style} onClick={this.handleClose}>Close</button> */}
                                                    <button className='btn-create' id={this.props.style} onClick={this.handleSubmit} disabled={this.state.loading}>Save changes</button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                {/* </Modal> */}
            </div>
        )
    }
}
