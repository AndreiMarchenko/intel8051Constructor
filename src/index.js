import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';

import './index.css'
import Field from './components/Field';
import Block from "./components/Block";

ReactDOM.render(
    <Provider store={store}>
        <Field />
    </Provider>,
    document.getElementById('root')
);
