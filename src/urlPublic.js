import React from 'react';
import axios from 'axios';
import {css} from 'emotion';
import {Link} from 'react-router-dom';

const formStyle = css`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const previewStyle = css`
    display: flex;
    flex-direction: row;
    margin: 20px;
`;

const previewUrlStyle = css`
    margin: 20px;
`;

const linkStyle = css``;

const submitStyle = css`
    width: 100px;
    height: 60px;
    margin: 10px;
    border-radius: 10px;
    background-color: #cccccc;
    font-size: 15px;
    font-weight: 500;
`;

const inputStyle = css`
    width: 80%;
    margin: 10px 0;
    height: 20px;
    border: 1px solid black;
`;

const refreshStyle = css`
    width: 100px;
    height: 60px;
    margin: 10px 50px 0 30px;
    border-radius: 10px;
    background-color: #cccccc;
    font-size: 15px;
    font-weight: 500;
`;

export class UrlPubilc extends React.Component {
    state = {
        originalUrl: [],
        shortUrl: ''
    };

    removeEmptyElements = originalUrl => {
        return originalUrl.filter(e => typeof e === 'string' && e !== '');
    };

    getUrl = async event => {
        event.preventDefault();
        const {originalUrl} = this.state;
        const originalUrlHelper = this.removeEmptyElements(originalUrl);
        console.log(originalUrl);
        await axios
            .post(
                '/api/url/',
                {originalUrl: originalUrlHelper},
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    crossdomain: true
                }
            )
            .then(response => {
                console.log(response);
                this.setState({shortUrl: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    };

    onUrlEnter = (event, pos) => {
        const {originalUrl} = this.state;
        const helper = originalUrl;
        helper[pos] = event.target.value;
        this.setState({originalUrl: helper});
    };

    refreshUrls = event => {
        this.setState({originalUrl: [], shortUrl: []});
    };

    render() {
        const {shortUrl} = this.state;
        let previewUrls;
        if (shortUrl.length > 0) {
            previewUrls = shortUrl.map(url => {
                return (
                    <div className={previewStyle} key={url.shortUrl}>
                        <div className={previewUrlStyle}>
                            {/* {window.location.href} */}
                            http://127.0.0.1:8000/r/
                            {url.shortUrl}/
                        </div>
                        <div className={previewUrlStyle}>{decodeURIComponent(url.originalUrl)}</div>
                    </div>
                );
            });
        }
        return (
            <div>
                {shortUrl.length === 0 && (
                    <form onSubmit={this.getUrl} className={formStyle}>
                        Enter urls you want to shorten:
                        <input className={inputStyle} onChange={event => this.onUrlEnter(event, 0)}></input>
                        <input className={inputStyle} onChange={event => this.onUrlEnter(event, 1)}></input>
                        <input className={inputStyle} onChange={event => this.onUrlEnter(event, 2)}></input>
                        <button className={submitStyle}>Submit</button>
                    </form>
                )}
                {previewUrls}
                <button className={refreshStyle} onClick={this.refreshUrls}>
                    Refresh
                </button>
                <Link to={'/urladmin/'} className={linkStyle}>
                    Go to Admin page
                </Link>
            </div>
        );
    }
}
