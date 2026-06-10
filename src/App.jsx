import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import MenuPage from './pages/Menu/MenuPage'
import CartPage from './pages/Cart/CartPage'
import HowToPage from './pages/HowTo/HowToPage'
import ContactPage from './pages/Contact/ContactPage'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminDashboard from './pages/Admin/AdminDashboard'

function AdminRoute() {
  const { session, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center py-24 text-gray-400">Cargando...</div>
  return session ? <AdminDashboard /> : <AdminLogin />
}

function CustomerApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/como-pedir" element={<HowToPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/*" element={<CustomerApp />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
