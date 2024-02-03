import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Search } from './pages/search/Search';
import { Home } from './pages/home/Home'
import { NavBar } from './components/navBar/NavBar';


export const MainRoutes = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/search" element={<Search/>}>
                </Route>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    )
}