import { Routes, Route } from "react-router-dom";
import ReceipePage from "./Pages/Receipe";
import Home from "./Pages/Home";
import SearchPage from "./Pages/Search";
function App() {
  return (
    <Routes>=
      <Route path="/" element={<Home />} /> {/* Home route */}
      <Route path="/Receipe/:id" element={<ReceipePage />} /> {/* page to display deatils of recipes  */}
      <Route path="/Search/:search" element={<SearchPage/>}/> {/* page for search results */}
    </Routes>
  );
}

export default App;
