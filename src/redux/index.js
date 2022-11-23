import { legacy_createStore as createStore, combineReducers } from "redux";
import editReducer from "./editReducer";


const rootReducer =  combineReducers({
    edit:editReducer,
    
});

export const store = createStore(rootReducer)