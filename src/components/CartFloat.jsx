import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const fmt = (n) => '$' + n.toLocaleString('es-AR')

export default function CartFloat() {
  const { totalItems, totalPrice } = useCart()
  const navigate = useNavigate()

  if (totalItems === 0) return null

  return (
    <button
      onClick={() => navigate('/carrito')}
      className="fixed bottom-5 left-4 right-4 z-40 text-white rounded-xl py-3 px-4 flex items-center justify-between shadow-lg"
      style={{ background: '#B91C1C' }}
    >
      <span className="bg-red-800 rounded-lg px-2 py-0.5 text-sm font-medium">
        {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}
      </span>
      <span className="text-sm font-medium">Ver pedido</span>
      <span className="text-sm font-medium">{fmt(totalPrice)}</span>
    </button>
  )
}
