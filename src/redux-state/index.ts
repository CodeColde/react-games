import { combineReducers, applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import users from "./users/reducers";
import darkMode from "./darkmode/reducers";
import loginReducer from "./login/reducers";

const appReducer = combineReducers({
    users,
    darkMode,
    login: loginReducer
});

export type AppState = ReturnType<typeof appReducer>;

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, appReducer);

function configureStore() {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        persistedReducer,
        composeWithDevTools(middlewareEnhancer)
    );

    const persistor = persistStore(store);

    return { store, persistor };
}

export const { store, persistor } = configureStore();