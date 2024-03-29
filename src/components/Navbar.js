import React from 'react';

export default function Navbar() {

        let categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
        return (
            <nav className={`navbar fixed-top navbar-expand-lg bg-body-tertiary bg-light`} data-bs-theme={`light`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Abc</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {<li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>}
                            <li className="nav-item">
                                <a className="nav-link" href="/about">About Us</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    Categories
                                </a>
                                <ul className="dropdown-menu">
                                    {categories.map((e) => {
                                        return (
                                            <li key={e}><a className="dropdown-item" href={`/${e}`}>{e}</a></li>
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className={`form-check form-switch text-light mx-2`}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">GO Dark</label>
                    </div>
                </div>
            </nav>
        );
    }

/*
// for checking the type of props passed
Navbar.propTypes = {
    company: propTypes.string.isRequired
}

//default values for props

Navbar.defaultProps = {
    company: 'default company'
}*/