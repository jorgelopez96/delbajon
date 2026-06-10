import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import storeConfig from '../config/store'

const tabs = [
  { to: '/', label: 'Productos', icon: '🍔' },
  { to: '/como-pedir', label: '¿Cómo pedir?', icon: '❓' },
  { to: '/carrito', label: 'Mi pedido', icon: '🛒' },
  { to: '/contacto', label: 'Contacto', icon: '📍' },
]

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-50" style={{ background: '#B91C1C' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-lg">🍔</div>
        <div>
          <h1 className="text-white font-medium text-base leading-tight">{storeConfig.name}</h1>
          <p className="text-red-300 text-xs">{storeConfig.tagline}</p>
        </div>
      </div>
      <div className="flex border-t border-red-700">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors relative ${
                isActive ? 'text-yellow-100 border-b-2 border-yellow-200' : 'text-red-300'
              }`
            }
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.to === '/carrito' && totalItems > 0 && (
              <span className="absolute top-1 right-2 bg-yellow-200 text-yellow-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
