import NewPlaylist from "./NewPlaylist.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="max-w-[1720px] w-full flex flex-col justify-center items-center">
        <NewPlaylist />
        <div className="absolute bottom-0 w-full left-0 flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
