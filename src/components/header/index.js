import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./style.css";
class Header extends Component {
    render() {
        return (
            <header className="map-header header">
                <div className="title">jusfoun-FE - 空间信息可视化交互平台
            <div className="title-after">
                        <div className="title-after-img"></div>
                        <div className="title-after-inimg"></div>
                        <div className="title-after-pimg"></div>
                    </div>
                </div>
                <ul className="nav">
                    <li>
                        <Link to='/1' replace >step1</Link>   
                    </li>
                    <li>
                        <Link to='/2' replace >step2</Link>   
                    </li>
                    <li>
                        <Link to='/3' replace >step3</Link>   
                    </li>
                </ul>
            </header>
        );
    }
}

export default Header;
