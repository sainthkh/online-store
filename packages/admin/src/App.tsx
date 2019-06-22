import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import ProductList from './pages/product-list';
import ProductAdd from './pages/product-add';
import ProductUpdate from './pages/product-update';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Dashboard} />
      <Route path="/products" exact component={ProductList} />
      <Route path="/products/add" exact component={ProductAdd} />
      <Route path="/products/update/:id" exact component={ProductUpdate} />
    </Router>
  );
}

export default App;
