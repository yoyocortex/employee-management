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
                {/* <li><a id={this.props.style} href="/">Dashboard</a></li>
                <li><a id={this.props.style} href="/employees">Manage employees</a></li>
                <li><a id={this.props.style} href="/category">Category</a></li>
                <li><a id={this.props.style} href="/profile">Profile</a></li>
                <li><a id={this.props.style} href="/graphs">Graphs</a></li>
                <li><a id={this.props.style} onClick={() => this.context.logout()} style={{'cursor': 'pointer'}}>Logout</a></li> */}
            </ul>
        )
    }
}

NavBar.contextType = AuthContext;