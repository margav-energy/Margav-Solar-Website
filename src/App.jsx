import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Favicon from "./components/Favicon";
import ScrollToTop from "./components/ScrollToTop";
import GoogleTagManager from "./components/GoogleTagManager";
import LeadCapturePopup from "./components/LeadCapturePopup";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Products from "./pages/Products";
import RequestQuotePage from "./pages/RequestQuotePage";
import Schedule from "./pages/Schedule";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import JobListing from "./pages/JobListing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Favicon />
        <ScrollToTop />
        <GoogleTagManager />
        <LeadCapturePopup />
        <CookieBanner />
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
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/job/:id" element={<JobListing />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
