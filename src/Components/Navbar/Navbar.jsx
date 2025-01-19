import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar({ loginData, logout }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent  ">
                <div className="container-fluid ">
                    <a className="navbar-brand" href="#">3Pillarstc</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {loginData ? (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="home">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="job">Job</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="department">Department</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="books">Book</Link>
                            </li>

                        </ul>) : ('')}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <div className="icons d-flex  align-items-center ">
                                {loginData ? (<h5 className='me-3 align-items-center'>Hello </h5>) : ('')}
                                <div className="icona me-2">
                                    <a href='https://www.facebook.com/'>
                                        <i className='fab fa-facebook '></i>
                                    </a>
                                </div>
                                <div className="icona me-2">
                                    <a href="https://www.yahoo.com/">
                                        <i className='fab fa-yahoo'></i>
                                    </a>
                                </div>
                                <div className="icona me-2">
                                    <a href="https://www.youtube.com/">
                                        <i className='fab fa-youtube'></i>
                                    </a>
                                </div>
                                <div className="icona me-2">
                                    <a href="https://www.linkedin.com/">
                                        <i className='fab fa-linkedin'></i>
                                    </a>
                                </div>
                            </div>

                            {!loginData ? (<li className="nav-item">
                                <Link className="nav-link active" aria-current="login" to="login">Login</Link>
                            </li>) : ''}

                            {!loginData ? (<li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>) : ('')}
                            {loginData ? <li className="nav-item">
                                <a onClick={logout} className="nav-link">Log out</a>
                            </li> : ''}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
