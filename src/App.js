import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Adventures from "./components/content/Adventures";
import AdventureDetail from "./components/content/AdventureDetail";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/adventure-detail/:id">
          <AdventureDetail />
        </Route>
        <Route path="/adventures/:id" exact>
          <Adventures />
        </Route>
        <Route path="/reservations" exact>
          <Reservation />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
