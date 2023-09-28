import EditSection from './DrawingCanvas';
import EditButtons from './SideBar';

const MainBody = () => {
  return (
    <div className="flex flex-1  ">
      <EditSection />
      <EditButtons />
    </div>
  );
};

export default MainBody;
