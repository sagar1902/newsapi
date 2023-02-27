import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import NewsCarousel from './NewsCarousel';


export default class NewsBody extends Component {
    static defaultProps = {
        country: "in",
        pagesize: { pagesize: [4, 3] },
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            cArticles: [],
            articles: [],
            loading: false,
            totalPages: 0,
            totalResults: 0,
            page: 1
        }
    }


    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category === "/" ? "general" : this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize.pagesize[0] * this.props.pagesize.pagesize[1]}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ cArticles: parsedData.articles.filter((e)=>{return e.urlToImage}).slice(0,3), articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, totalPages: Math.ceil(parsedData.totalResults / (this.props.pagesize.pagesize[0] * this.props.pagesize.pagesize[1])) });
    }


    previousPage = async () => {
        this.setState({ page: this.state.page - 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category === "/" ? "general" : this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pagesize=${this.props.pagesize.pagesize[0] * this.props.pagesize.pagesize[1]}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, loading: false });
    }

    nextPage = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category === "/" ? "general" : this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pagesize=${this.props.pagesize.pagesize[0] * this.props.pagesize.pagesize[1]}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, loading: false });
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 style={{height: "7rem"}}>AAJ tak</h1>
                </div>
                <div className="container my-3">
                    <NewsCarousel cArticles={this.state.cArticles}/>
                </div>
                <div className="container my-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${this.state.page < 2 ? "disabled" : ""}`}>
                                <button disabled={this.state.page < 2} type="button" className="page-link" onClick={this.previousPage}>Previous</button>
                            </li>
                            <li className={`page-item ${this.state.page >= this.state.totalPages ? "disabled" : ""}`}>
                                <button disabled={this.state.page >= this.state.totalPages} type="button" className="page-link" onClick={this.nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container">{/*
                            <div className="container my-3">
                                <h2>AAJ tak</h2>
                                <div className="row my-6">
                                    {this.state.articles.map((element) => {
                                        return (
                                            <div className={`col-md-${Math.ceil(12 / this.props.pagesize.pagesize[1])} my-5`} key={element.url}>
                                                <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 100) + "..." : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                            </div>)
                                    })}
                                </div>
                            </div>
                                */ }
                </div>
                {this.state.loading &&
                    <div className="container text-center">
                        <Spinner />
                    </div>
                }
                {!this.state.loading &&
                    <div className="container my-3">
                        <div className="row my-6">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className={`col-md-${Math.ceil(12 / this.props.pagesize.pagesize[1])} my-5`} key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 100) + "..." : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                    </div>)
                            })}
                        </div>
                    </div>
                }

                <div className="container my-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${this.state.page < 2 ? "disabled" : ""}`}>
                                <button type="button" className="page-link" onClick={this.previousPage}>Previous</button>
                            </li>
                            <li className={`page-item ${this.state.page >= this.state.totalPages ? "disabled" : ""}`}>
                                <button type="button" className="page-link" onClick={this.nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}