import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import i18n from '../translations/config';

export default class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark nav-header">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/'}> {i18n.t("employee")} </Link>
                            </li>
                        </ul>
                        <LanguageSelector />
                    </nav>
                </div>
            </div>)
    }
}