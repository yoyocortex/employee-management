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
        const { list } = this.props;

        const keys = Object.keys(list);
        const values = Object.values(list);
        for (let index = 0; index < values.length; index++) {
            this.setState({ [keys[index]]: values[index] });
        }
    };

    handleSubmit = (e) => {
        const { contentType, update } = this.props;

        e.preventDefault();
        let formData;
        if (contentType === 'employee') {
            formData = {
                fullname: this.state.fullname,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                category: this.state.category,
                salary: this.state.salary
            };
        } else if (contentType === 'category') {
            formData = {
                categoryname: this.state.categoryname
            };
        }
        console.log(update(this.state.id, formData));
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
        const {
            open, style,
            contentType,
            categories
        } = this.props;

        const {
            close, error, fullname,
            email, password, address,
            category, salary, categoryname,
            loading
        } = this.state;

        return (
            <div className={open === true && close === false ? "modal fade show" : "modal fade"}
                id="editListItem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                aria-hidden={open === true && close === false ? "false" : "true"}
                style={{ display: open === true && close === false ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header" id={style}>
                            <h5 className="modal-title" id={style}>{contentType === 'employee' ? 'Edit an employee' : 'Edit a category'}</h5>
                            <button type="button" id={style} onClick={this.handleClose} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id={style}>
                            <Container className='d-flex align-items-center justify-content-center border-none'>
                                <div className='w-100' style={{ maxWidth: "600px" }}>
                                    <Card className="edit-list-item-card" id={style}>
                                        <Card.Body>
                                            {error && <Alert variant='danger'>{error}</Alert>}
                                            <Form>
                                                {contentType === 'employee' ?
                                                    <>
                                                        <Form.Group className='form-group' id="fullname">
                                                            <Form.Label>Fullname</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={fullname} name='fullname' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="email">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" onChange={this.handleInputChange} value={email} name='email' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="password">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" onChange={this.handleInputChange} value={password} name='password' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="address">
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control type="text" onChange={this.handleInputChange} value={address} name='address' required></Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className='form-group' id="category">
                                                            <Form.Label>Category</Form.Label>
                                                            <div className="dropdown" style={{ width: '100%' }}>
                                                                <button className="dropdown-toggle dropdown-btn"
                                                                    type="button" id={style}
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
                                                        <Form.Group className='form-group' id="salary">
                                                            <Form.Label>Salary</Form.Label>
                                                            <Form.Control type="numbers" onChange={this.handleInputChange} value={salary} name='salary' required></Form.Control>
                                                        </Form.Group>
                                                    </>
                                                    :
                                                    <Form.Group id="categoryname">
                                                        <Form.Label>Category name</Form.Label>
                                                        <Form.Control type="text" onChange={this.handleInputChange} value={categoryname} name='categoryname' required></Form.Control>
                                                    </Form.Group>
                                                }
                                                <div className="modal-footer">
                                                    <button className='btn-create' onClick={this.handleSubmit} disabled={loading}>Save changes</button>
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
