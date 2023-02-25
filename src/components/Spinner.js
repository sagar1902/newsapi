import React from 'react';


export default class Spinner extends React.Component {

    render() {
        return (
            <div className="spinner-border text-success text-center" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
}