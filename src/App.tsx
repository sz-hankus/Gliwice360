import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MapBrowser } from "./components/MapBrowser/MapBrowser";
import { PanoramaView } from "./components/PanoramaView/PanoramaView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapBrowser />} />
        <Route path="/panoview/:id" element={<PanoramaView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
