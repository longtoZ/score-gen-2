import { Hero } from '../../components/home/Hero';
import { Features } from '../../components/home/Features';
import { Benefits } from '../../components/home/Benefits';
import { Compare } from '../../components/home/Compare';
import { Questions } from '../../components/home/Questions';
import { Tech } from '../../components/home/Tech';
import './home.css';
import './responsive.css';

export const Home = () => {
    return (
        <div className='Home'>
            <Hero />
            <Benefits />
            <Features />
            <Compare />
            <Questions />
            <Tech />
        </div>
    );
};
