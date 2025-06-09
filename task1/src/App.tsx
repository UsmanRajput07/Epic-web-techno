import { useState } from 'react'
import './App.css'
import { ProductList } from './pages/ProductList'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './pages/Layout'
import { ShoppingCart } from './pages/ShoppingCart'
import type { Product } from './types/Products'

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (product: Product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id))
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList add={addToCart} remove={removeFromCart} />} />
            <Route path='cart' element={<ShoppingCart products={cartItems} remove={removeFromCart} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
