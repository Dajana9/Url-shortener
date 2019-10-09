import React from 'react';
import {UrlPubilc} from './urlPublic';
import {UrlAdmin} from './urlAdmin';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/urladmin/" component={UrlAdmin} />
                    <Route path="/" component={UrlPubilc} />
                </Switch>
            </BrowserRouter>
        );
    }
}
