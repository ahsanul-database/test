import { Outlet } from "react-router-dom";
import "./App.css";
import MyNav from "./components/MyNav";
import Footer from "./components/Footer";

function App() {
  // const [isOpen, setIsOpen] = useState(true);
  // const ShowedAlert = sessionStorage.getItem("Anniversary");
  // if (ShowedAlert === null) {
  //   setIsOpen(true);
  //   sessionStorage.setItem("Anniversary", true);
  // }
  return (
    <div className=" lg:w-full">
      <MyNav />
      <div className="w-full lg:w-full">
        <Outlet />
      </div>
      <Footer />
      {/* <MyModal isOpen={isOpen} setIsOpen={setIsOpen}></MyModal> */}
    </div>
  );
}

export default App;
