import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className='d-flex flex-column justify-content-center align-items-center align-self-center' style={{ height: '100vh' }}>
                <h1 className='p-3'>Profile</h1>
                <div className='d-flex flex-row justify-content-center align-items-center align-self-center'>
                    <h2 className='p-1'>Email:</h2>
                    <h3 className='p-1'>{user}</h3>
                </div>
            </div>
        )
    }
}
