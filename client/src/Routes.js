import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Search } from './pages/search/Search';
import { Suggest } from './pages/suggest/Suggest';
import { Visual } from './pages/visual/Visual';
import { NavBar } from './components/navBar/NavBar';

export const MainRoutes = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/suggest" element={<Suggest />} />
                <Route path="/visual" element={<Visual />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};
