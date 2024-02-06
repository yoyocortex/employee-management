import React, { Component } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (
            <ul className='ver-navbar'>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/employees">Manage employees</Link></li>
                <li><Link to="/category">Category</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/graphs">Graph</Link></li>
                <li><Link onClick={() => this.context.logout()} style={{'cursor': 'pointer'}}>Logout</Link></li>
            </ul>
        )
    }
}

NavBar.contextType = AuthContext;