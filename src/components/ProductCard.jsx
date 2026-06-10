export default function ProductCard({ product, onAdd }) {
  const fmt = (n) => '$' + n.toLocaleString('es-AR')

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 active:bg-red-50 transition-colors cursor-pointer"
      onClick={() => onAdd(product)}
    >
      <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
        {product.image_url
          ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          : <span>{product.emoji || '🍔'}</span>
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-snug">{product.name}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">{product.description}</p>
        <p className="text-sm font-medium mt-1" style={{ color: '#B91C1C' }}>{fmt(product.price)}</p>
      </div>
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xl"
        style={{ background: '#B91C1C' }}
        aria-label={`Agregar ${product.name}`}
        onClick={(e) => { e.stopPropagation(); onAdd(product) }}
      >+</button>
    </div>
  )
}
