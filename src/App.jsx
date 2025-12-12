import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Favicon from "./components/Favicon";
import ScrollToTop from "./components/ScrollToTop";
import Snowflakes from "./components/Snowflakes";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Products from "./pages/Products";
import RequestQuotePage from "./pages/RequestQuotePage";
import Schedule from "./pages/Schedule";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Favicon />
        <ScrollToTop />
        <Snowflakes />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/products" element={<Products />} />
            <Route path="/request-quote" element={<RequestQuotePage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
