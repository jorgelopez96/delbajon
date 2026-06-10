import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import storeConfig from '../../config/store'

const fmt = (n) => '$' + n.toLocaleString('es-AR')

export default function CartPage() {
  const { items, removeItem, totalPrice, clearCart } = useCart()
  const [payMethod, setPayMethod] = useState('efectivo')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  const sendToWhatsApp = () => {
    if (!name.trim()) return alert('Por favor ingresá tu nombre.')
    if (items.length === 0) return alert('Tu carrito está vacío.')

    let msg = `🍔 *Nuevo pedido - ${storeConfig.name}*\n\n`
    msg += `👤 *Cliente:* ${name.trim()}\n`
    if (address.trim()) msg += `📍 *Dirección:* ${address.trim()}\n`
    msg += `\n*Productos:*\n`
    items.forEach(item => {
      msg += `• ${item.qty}x ${item.product.name} — ${fmt(item.total)}\n`
      if (item.additionals.length > 0)
        msg += `  _+ ${item.additionals.map(a => a.name).join(', ')}_\n`
    })
    msg += `\n💰 *Total: ${fmt(totalPrice)}*\n`
    if (payMethod === 'transferencia') {
      msg += `\n💳 *Pago:* Transferencia\n`
      msg += `CBU: ${storeConfig.payment.cbu}\n`
      msg += `Alias: ${storeConfig.payment.alias}`
    } else {
      msg += `\n💵 *Pago:* Efectivo`
    }

    const url = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <span className="text-5xl mb-4">🛒</span>
      <p className="text-gray-500 text-sm">Tu carrito está vacío.<br />Agregá algo del menú para empezar.</p>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="bg-white">
        {items.map(item => (
          <div key={item.cartId} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.qty}x {item.product.name}</p>
              {item.additionals.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">+ {item.additionals.map(a => a.name).join(', ')}</p>
              )}
            </div>
            <span className="text-sm font-medium" style={{ color: '#B91C1C' }}>{fmt(item.total)}</span>
            <button onClick={() => removeItem(item.cartId)} className="text-gray-400 text-lg px-1">🗑</button>
          </div>
        ))}
      </div>

      <div className="bg-white mt-2 px-4 py-4 border-t border-b border-gray-100">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Subtotal</span><span>{fmt(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>Envío</span><span className="text-green-600">Gratis</span>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900 pt-3 border-t border-gray-100">
          <span>Total</span><span>{fmt(totalPrice)}</span>
        </div>
      </div>

      <div className="px-4 mt-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Método de pago</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[['efectivo', '💵', 'Efectivo'], ['transferencia', '💳', 'Transferencia']].map(([val, icon, label]) => (
            <button
              key={val}
              onClick={() => setPayMethod(val)}
              className={`border rounded-xl py-3 text-sm flex flex-col items-center gap-1 transition-colors ${
                payMethod === val ? 'border-red-700 bg-red-50' : 'border-gray-200 bg-white'
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className={payMethod === val ? 'text-red-700 font-medium' : 'text-gray-700'}>{label}</span>
            </button>
          ))}
        </div>

        {payMethod === 'transferencia' && (
          <div className="bg-yellow-50 rounded-xl px-4 py-3 mb-4 text-sm text-yellow-800">
            <p><strong>CBU:</strong> {storeConfig.payment.cbu}</p>
            <p><strong>Alias:</strong> {storeConfig.payment.alias}</p>
            <p className="text-xs mt-2 text-yellow-700">Enviá el comprobante por WhatsApp al confirmar.</p>
          </div>
        )}

        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Tus datos</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-2 outline-none focus:border-red-400"
        />
        <input
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Tu dirección (para delivery)"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-4 outline-none focus:border-red-400"
        />

        <button
          onClick={sendToWhatsApp}
          className="w-full text-white rounded-xl py-4 text-sm font-medium flex items-center justify-center gap-2"
          style={{ background: '#16A34A' }}
        >
          <span>💬</span>
          Confirmar pedido por WhatsApp
        </button>
      </div>
    </div>
  )
}
