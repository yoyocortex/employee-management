import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>Employee Management System</h1>
                <input type='checkbox' onClick={this.props.changeStyle} defaultChecked={this.props.checked} className="theme-checkbox"></input>
            </div>
        )
    }
}
