import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import About from "./pages/About";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./components/Dashbaord";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:rangeValue" element={<Cars />} />
          <Route path="/cars/page/:pageNumber" element={<Cars />} />
          <Route path="/cars/page/:pageNumber/:rangeValue" element={<Cars />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
