import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export default class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark nav-header">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/'}> Employees </Link>
                            </li>
                        </ul>
                        <LanguageSelector />
                        <Link className="btn btn-outline-light" to="/create">Create Customer</Link>
                    </nav>
                </div>
            </div>)
    }
}