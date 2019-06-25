import { ThemeProvider } from '@beanovia/theme'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import ProductAdd from './pages/product-add'
import ProductList from './pages/product-list'
import ProductUpdate from './pages/product-update'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Route path="/" exact={true} component={Dashboard} />
        <Route path="/products" exact={true} component={ProductList} />
        <Route path="/products/add" exact={true} component={ProductAdd} />
        <Route path="/products/update/:id" exact={true} component={ProductUpdate} />
      </Router>
    </ThemeProvider>
  )
}

export default App
