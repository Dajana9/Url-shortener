import React from 'react';
import axios from 'axios';
import {css} from 'emotion';
import {Link} from 'react-router-dom';

const inputStyle = css`
    width: 200px;
    margin: 10px 0 20px 0;
    height: 20px;
`;

const containerStyle = css`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const linkStyle = css`
    margin: 20px;
`;

const buttonStyle = css`
    width: 100px;
    height: 60px;
    margin: 10px;
    border-radius: 10px;
    background-color: #cccccc;
    font-size: 15px;
    font-weight: 500;
`;

const urlsStyle = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: 5px;
`;

const shortUrlStyle = css`
    width: 300px;
`;
export class UrlAdmin extends React.Component {
    state = {
        password: '',
        username: '',
        data: [],
        deleteUrl: ''
    };

    getAllUrls = async event => {
        if (event) {
            event.preventDefault();
        }
        const {username, password} = this.state;
        await axios
            .get('/api/url/', {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true,
                auth: {
                    username: username,
                    password: password
                }
            })
            .then(response => {
                this.setState({data: response.data});
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                alert('Wrong username or password!');
            });
    };
    delete = async event => {
        event.preventDefault();
        const {username, password, deleteUrl} = this.state;
        await axios
            .delete(`/api/url/${deleteUrl}/`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true,
                auth: {
                    username: username,
                    password: password
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.getAllUrls();
    };

    username = event => {
        this.setState({username: event.target.value});
    };

    password = event => {
        this.setState({password: event.target.value});
    };

    deleteUrl = event => {
        this.setState({deleteUrl: event.target.value});
    };

    render() {
        const {data} = this.state;
        const allUrls = data.map(item => {
            return (
                <div className={urlsStyle} key={item.shortUrl}>
                    <div className={shortUrlStyle}>http://127.0.0.1:8000/r/{item.shortUrl}/</div>
                    <div>{decodeURIComponent(item.originalUrl)}</div>
                </div>
            );
        });
        return (
            <div className={containerStyle}>
                Username<input className={inputStyle} onChange={this.username}></input>
                Password<input className={inputStyle} onChange={this.password}></input>
                <button className={buttonStyle} onClick={this.getAllUrls}>
                    Get all urls
                </button>
                <Link to={'/'} className={linkStyle}>
                    Create short urls
                </Link>
                Url to delete (just type shortchode)<input className={inputStyle} onChange={this.deleteUrl}></input>
                <button className={buttonStyle} onClick={this.delete}>
                    Delete
                </button>
                {allUrls}
            </div>
        );
    }
}
