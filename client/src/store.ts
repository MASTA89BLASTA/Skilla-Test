import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { useDispatch } from "react-redux";

import callsReducer from "./features/redux/reducer";

const rootReducer = combineReducers({
  callsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
