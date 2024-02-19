import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Search } from './pages/search/Search';
import { Suggest } from './pages/suggest/Suggest';
import { Visual } from './pages/visual/Visual';
import { Print } from './pages/print/Print';
import { NavBar } from './components/navBar/NavBar';
import { Footer } from './components/navBar/Footer';

import { Docs } from './pages/docs/Docs';
import { Introduction } from './components/docs/Introduction';
import { Migration } from './components/docs/Migration';
import { SearchDocs } from './components/docs/Search';
import { SuggestDocs } from './components/docs/Suggest';
import { VisualDocs } from './components/docs/Visual';
import { PrintDocs } from './components/docs/Print';

export const MainRoutes = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/suggest" element={<Suggest />} />
                <Route path="/visual" element={<Visual />} />
                <Route path="/print" element={<Print />} />
                <Route path="/docs" element={<Docs />}>
                    <Route path='introduction' element={<Introduction />} />
                    <Route path='migration' element={<Migration />} />
                    <Route path='search' element={<SearchDocs />} />
                    <Route path='suggest' element={<SuggestDocs />} />
                    <Route path='visual' element={<VisualDocs />} />
                    <Route path='print' element={<PrintDocs />} />
                </Route>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer/>
        </Router>
    );
};
