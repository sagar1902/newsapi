import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import NewsCarousel from './NewsCarousel';


export default function NewsBody(props){
    
    const [state, setState] = useState({
        cArticles: [],
        articles: [],
        loading: false,
        totalPages: 0,
        totalResults: 0
    });
    const [page, setPage] = useState(1);
/*
    constructor() {
        super();
        state = {
            cArticles: [],
            articles: [],
            loading: false,
            totalPages: 0,
            totalResults: 0,
            page: 1
        }
    }
*/

    const loadNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category === "/" ? "general" : props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize.pagesize[0] * props.pagesize.pagesize[1]}`;
        setState({...state, loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setState({...state, cArticles: parsedData.articles.filter((e)=>{return e.urlToImage}).slice(0,3), articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, totalPages: Math.ceil(parsedData.totalResults / (props.pagesize.pagesize[0] * props.pagesize.pagesize[1])) });
    }

    useEffect(()=>{loadNews()
    }, []);


    const previousPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category === "/" ? "general" : props.category}&apiKey=${props.apikey}&page=${page - 1}&pagesize=${props.pagesize.pagesize[0] * props.pagesize.pagesize[1]}`;
        setPage(page-1);
        setState({...state, loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setState({...state, articles: parsedData.articles, loading: false });
    }

    const nextPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category === "/" ? "general" : props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pagesize.pagesize[0] * props.pagesize.pagesize[1]}`;
        setPage(page + 1);
        setState({...state, loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setState({...state, articles: parsedData.articles, loading: false });

    }

        return (
            <>
                <div className="container my-3">
                    <h1 style={{marginTop: "5rem"}}>AAJ tak</h1>
                </div>
                <div className="container my-3">
                    <NewsCarousel cArticles={state.cArticles}/>
                </div>
                <div className="container my-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${page < 2 ? "disabled" : ""}`}>
                                <button disabled={page < 2} type="button" className="page-link" onClick={previousPage}>Previous</button>
                            </li>
                            <li className={`page-item ${page >= state.totalPages ? "disabled" : ""}`}>
                                <button disabled={page >= state.totalPages} type="button" className="page-link" onClick={nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container">{/*
                            <div className="container my-3">
                                <h2>AAJ tak</h2>
                                <div className="row my-6">
                                    {state.articles.map((element) => {
                                        return (
                                            <div className={`col-md-${Math.ceil(12 / props.pagesize.pagesize[1])} my-5`} key={element.url}>
                                                <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 100) + "..." : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                            </div>)
                                    })}
                                </div>
                            </div>
                                */ }
                </div>
                {state.loading &&
                    <div className="container text-center">
                        <Spinner />
                    </div>
                }
                {!state.loading &&
                    <div className="container my-3">
                        <div className="row my-6">
                            {state.articles.map((element) => {
                                return (
                                    <div className={`col-md-${Math.ceil(12 / props.pagesize.pagesize[1])} my-5`} key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 100) + "..." : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                    </div>)
                            })}
                        </div>
                    </div>
                }

                <div className="container my-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${page < 2 ? "disabled" : ""}`}>
                                <button type="button" className="page-link" onClick={previousPage}>Previous</button>
                            </li>
                            <li className={`page-item ${page >= state.totalPages ? "disabled" : ""}`}>
                                <button type="button" className="page-link" onClick={nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }

NewsBody.defaultProps = {
    country: "in",
    pagesize: { pagesize: [4, 3] },
    category: "general"
}

NewsBody.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}