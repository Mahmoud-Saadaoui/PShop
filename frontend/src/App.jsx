import React from "react";
import Header from "./components/header/index"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header/>
      <main className="min-h-[80vh]">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default App;