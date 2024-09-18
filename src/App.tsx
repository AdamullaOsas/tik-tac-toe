import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Multi from "./components/Multi.tsx";
import Single from "./components/Single.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/multi" element={<Multi />} />
                <Route path="/single" element={<Single />} />
            </Routes>
        </Router>
    );
}

export default App;
