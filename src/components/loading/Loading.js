import React, { Component } from 'react'
import './Loading.css';

export default class Loading extends Component {
    render() {
        return (
            <div className='first-wrapper'>
                <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div>
            </div>
        )
    }
}
