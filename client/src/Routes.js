import React from 'react';
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';

import { Introduction } from './components/docs/Introduction';
import { Migration } from './components/docs/Migration';
import { PrintDocs } from './components/docs/Print';
import { SearchDocs } from './components/docs/Search';
import { SuggestDocs } from './components/docs/Suggest';
import { VisualDocs } from './components/docs/Visual';
import { Footer } from './components/navBar/Footer';
import { NavBar } from './components/navBar/NavBar';

import { Docs } from './pages/docs/Docs';
import { NotFound } from './pages/error/NotFound';
import { Home } from './pages/home/Home';
import { Print } from './pages/print/Print';
import { Search } from './pages/search/Search';
import { Suggest } from './pages/suggest/Suggest';
import { Visual } from './pages/visual/Visual';

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
                    <Route path="" element={<Navigate to="introduction" />} />
                    <Route path="introduction" element={<Introduction />} />
                    <Route path="migration" element={<Migration />} />
                    <Route path="search" element={<SearchDocs />} />
                    <Route path="suggest" element={<SuggestDocs />} />
                    <Route path="visual" element={<VisualDocs />} />
                    <Route path="print" element={<PrintDocs />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};
