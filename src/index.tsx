import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import './index.css';
import Root from './Root';
import { store, persistor } from 'redux-state';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Root />
            </PersistGate>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));