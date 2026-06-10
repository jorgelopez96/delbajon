import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import storeConfig from '../config/store'
import { UtensilsCrossed, HelpCircle, MapPin, ShoppingBag } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Productos', Icon: UtensilsCrossed },
  { to: '/como-pedir', label: '¿Cómo pedir?', Icon: HelpCircle },
  { to: '/contacto', label: 'Contacto', Icon: MapPin },
  { to: '/carrito', label: 'Mi pedido', Icon: ShoppingBag },
]

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-50 shadow-md" style={{ background: '#B91C1C' }}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <UtensilsCrossed size={20} color="#B91C1C" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-white font-bold text-base leading-tight tracking-tight">{storeConfig.name}</h1>
          <p className="text-red-200 text-xs leading-tight">{storeConfig.tagline}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-red-800">
        {tabs.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-all relative ${
                isActive
                  ? 'text-white border-b-2 border-white'
                  : 'text-red-200 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  {to === '/carrito' && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="leading-none">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
