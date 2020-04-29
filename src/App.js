import React from "react";
import Layout from "./components/Layouts/Layouts";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import "./App.css";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
