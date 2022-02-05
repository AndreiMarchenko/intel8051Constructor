import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';

import './index.css'
import WorkBench from "./components/WorkBench";

ReactDOM.render(
    <Provider store={store}>
        <WorkBench />
    </Provider>,
    document.getElementById('root')
);
