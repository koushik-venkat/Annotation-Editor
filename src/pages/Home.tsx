import MainBody from '../components/MainBody';
import Footer from '../components/Footer';
import CanvasProvider from '../context/CanvasProvider';

const Home = () => {
  return (
    <CanvasProvider>
      <div className="flex flex-col min-h-screen bg-red-500 ">
        <MainBody />
        <Footer />
      </div>
    </CanvasProvider>
  );
};
export default Home;
