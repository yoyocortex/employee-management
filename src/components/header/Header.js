import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        const {
            changeStyle,
            checked
        } = this.props;

        return (
            <div className="header">
                <h1>Employee Management System</h1>
                <input type='checkbox' onClick={changeStyle} defaultChecked={checked} className="theme-checkbox"></input>
            </div>
        )
    }
}
