import { useEffect } from 'react';
import { Benefits } from '../../components/home/Benefits';
import { Compare } from '../../components/home/Compare';
import { Features } from '../../components/home/Features';
import { Hero } from '../../components/home/Hero';
import { Questions } from '../../components/home/Questions';
import { Tech } from '../../components/home/Tech';

import './home.css';
import './responsive.css';

// import { track } from '../../utils/activity';

export const Home = () => {
    // useEffect(() => {
    //     track();
    // }, [])
    useEffect(() => {
        document.title = 'Score | Trang chủ';
    }, []);
    return (
        <div className="Home">
            <Hero />
            <Benefits />
            <Features />
            <Compare />
            <Questions />
            <Tech />
        </div>
    );
};
