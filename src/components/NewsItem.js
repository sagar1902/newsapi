import React from 'react';


export default function NewsItem(props) {

    let { title, description, imgurl, newsurl, author, publishedAt, source } = props;
    return (
        <div className="card" style={{ "width": "auto" }}>
            <img src={imgurl ? imgurl : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/collage_maker-21-feb-2023-03.30-pm-sixteen_nine.jpg?VersionId=hHgI1Y6L.nmdP4JrzCzr85.TVrapp2g6"} className="card-img-top" height="auto" alt="taaza khabar" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-primary">Read</a><hr />
                <p className="card-text"><small className="text-muted">{author ? <strong>{author}</strong> : <i>{"<unknown>"}</i>} on {new Date(publishedAt).toGMTString()}</small></p>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "85%", zIndex: 1 }}>
                    {source}
                </span>
            </div>
        </div>
    )
}