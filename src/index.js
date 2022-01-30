import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';

import './index.css'
import Field from './components/field/Field';
import Block from "./components/field/Block";

ReactDOM.render(
    <Provider store={store}>
        <Field />
    </Provider>,
    document.getElementById('root')
);
