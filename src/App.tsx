import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header} from "./Containers"
import { About, ComicDetails, Home, Cart } from "./routes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/comic/:id" element={<ComicDetails />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
