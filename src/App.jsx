import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import Boards from "./components/Boards";
import Board from "./components/Board";
import { PersistGate } from "redux-persist/integration/react";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/trello-clone/" element={<Boards />} />
                            <Route
                                path="/trello-clone/:id"
                                element={<Board />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
