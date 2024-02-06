import React, { Component } from 'react';
import { Form, Card, Alert, Container } from 'react-bootstrap';

import './NewCategory.css';

export default class NewCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: false,
            categoryname: ""
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { categoryname } = this.state;

        const { add } = this.props;

        let formData = {
            categoryname: categoryname
        };

        add(formData);
        this.setState({categoryname: ""});
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    };

    render() {

        const { categoryname, error, loading } = this.state;

        return (
            <div className="modal fade" id="newCategory" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title create-new-emp-text">Create a new category</h5>
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
                                                <Form.Group id="categoryname">
                                                    <Form.Label>Category name</Form.Label>
                                                    <Form.Control type="text" onChange={this.handleInputChange} value={categoryname} name='categoryname' required></Form.Control>
                                                </Form.Group>
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
