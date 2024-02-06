import React, { Component } from 'react';
import { Form, Card, Alert, Container } from 'react-bootstrap';

import './EditCategory.css';

export default class EditCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: false,
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

    componentWillUnmount = () => {
        this.setState({ id: "", categoryname: "" });
    };

    handleSubmit = (e) => {
        const { update } = this.props;

        e.preventDefault();
        let formData = {
            categoryname: this.state.categoryname
        };

        update(this.state.id, formData);
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
        const { open } = this.props;

        const {
            close, error, categoryname, loading
        } = this.state;

        return (
            <div className={open === true && close === false ? "modal fade show" : "modal fade"}
                id="editCategory" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                aria-hidden={open === true && close === false ? "false" : "true"}
                style={{ display: open === true && close === false ? 'block' : 'none' }} >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit a category</h5>
                            <button type="button" onClick={this.handleClose} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Container className='d-flex align-items-center justify-content-center border-none'>
                                <div className='w-100' style={{ maxWidth: "600px" }}>
                                    <Card className="edit-list-item-card">
                                        <Card.Body>
                                            {error && <Alert variant='danger'>{error}</Alert>}
                                            <Form>
                                                <Form.Group id="categoryname">
                                                    <Form.Label>Category name</Form.Label>
                                                    <Form.Control type="text" onChange={this.handleInputChange} value={categoryname} name='categoryname' required></Form.Control>
                                                </Form.Group>
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
            </div>
        )
    }
}
