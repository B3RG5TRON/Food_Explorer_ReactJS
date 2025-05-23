import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"

import { Home } from "../pages/home"
import { Dish } from "../pages/dish"
import { Profile } from "../pages/profile"
import { Orders } from "../pages/orders"
import { Checkout } from "../pages/checkout"
import { OrderCompleted } from "../pages/orderCompleted"
import { OrderStatus } from "../pages/orderStatus"
import { DetailsOrder } from "../pages/detailsOrder"
import { Favorites } from "../pages/favorites"

import { useAuth } from "../hooks/auth"

export function CustomerRoutes() {
  const { user, dishRedirection, redirectionDish } = useAuth()
  const dish = dishRedirection

  useEffect(() => {
    if (user && dishRedirection) {
      redirectionDish("")
    }
  }, [user, dishRedirection, redirectionDish])

  if (user && dishRedirection) {
    return <Navigate to={`/dish/${dish}`} replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dish/:id" element={<Dish />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order_completed" element={<OrderCompleted />} />
      <Route path="/order_status" element={<OrderStatus />} />
      <Route path="/details_order/:id" element={<DetailsOrder />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
