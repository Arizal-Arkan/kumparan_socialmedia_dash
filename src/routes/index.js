import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/';
import DetailUser from '../pages/DetailUser';
import DetailPost from '../pages/DetailPost';
import DetailAlbum from '../pages/DetailAlbum';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/detail-user/:idUser" exact element={<DetailUser />} />
                <Route path="/detail-post/:idPost" exact element={<DetailPost />} />
                <Route path="/detail-album/:idAlbum" exact element={<DetailAlbum />} />
            </Routes>
        </Router>
    );
}

export default App
