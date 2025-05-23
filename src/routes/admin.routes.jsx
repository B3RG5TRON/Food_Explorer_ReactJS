import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"

import { Home } from "../pages/home"
import { Dish } from "../pages/dish"
import { NewDish } from "../pages/newDish"
import { EditDish } from "../pages/editDish"
import { Profile } from "../pages/profile"
import { OrderStatus } from "../pages/orderStatus"
import { DetailsOrder } from "../pages/detailsOrder"
import { Favorites } from "../pages/favorites"

import { useAuth } from "../hooks/auth"

export function AdminRoutes() {
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
      <Route path="/new_dish" element={<NewDish />} />
      <Route path="/edit_dish/:id" element={<EditDish />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order_status" element={<OrderStatus />} />
      <Route path="/details_order/:id" element={<DetailsOrder />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
