import Hero from "./components/Hero";
import InfoBoxes from './components/InfoBoxes';
import Home from './components/Home';
import connectDB from '@/config/db_config';

const HomePage = () => {

    console.log("MONGODB_URI",process.env.MONGODB_URI);
    connectDB();

    return(
        <>
           <Hero/>
           <InfoBoxes/>
           <Home/>
        </>
    )
};

export default HomePage;