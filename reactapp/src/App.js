import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import React, {Component} from "react";
import './App.css';
import DocumentTitle from 'react-document-title'
import BackButton from "./BackButton";
import Home from "./Home";
import Range from "./Range";
import RangeType from "./RangeType";
import Model from "./Model"

function App() {
    return (
        <DocumentTitle title = 'Shop100'>
        <BrowserRouter basename="/" >
            <div>
                <ul>
                    <li>
                        <Link to="/">Дом</Link>
                    </li>
                    <li>
                        <Link to="/range">Ассортимент</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/range">
                        <Range/>
                        <BackButton/>
                    </Route>
                    <Route exact path={`/range/:rangeId/models`}>
                        <RangeType/>
                        <BackButton/>
                    </Route>
                    <Route exact path={'/range/:rangeId/models/:modelId'}>
                        <Model/>
                        <BackButton/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>

    </DocumentTitle>
    );
}


export default App;