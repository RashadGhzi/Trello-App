import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import ListItem from "./components/list/ListItem";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="list/:id" element={<ListItem />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
