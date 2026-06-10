import storeConfig from '../../config/store'

export default function ContactPage() {
  const rows = [
    { icon: '📍', label: 'Dirección', value: storeConfig.address, href: storeConfig.mapsUrl },
    { icon: '💬', label: 'WhatsApp', value: storeConfig.phone, href: `https://wa.me/${storeConfig.whatsapp}` },
    { icon: '📸', label: 'Instagram', value: '@del.bajon', href: storeConfig.instagram },
    { icon: '🕐', label: 'Horarios', value: storeConfig.hours, href: null },
  ]

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Ubicación</p>

      <a
        href={storeConfig.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-100 rounded-xl h-40 mb-4 flex flex-col items-center justify-center gap-2 border border-gray-200 active:bg-gray-200 transition-colors"
      >
        <span className="text-4xl">🗺️</span>
        <span className="text-sm text-gray-500">Ver en Google Maps</span>
      </a>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {rows.map((row, i) => (
          row.href ? (
            <a
              key={i}
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0 active:bg-gray-50"
            >
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-lg flex-shrink-0">
                {row.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">{row.label}</p>
                <p className="text-sm font-medium text-gray-900">{row.value}</p>
              </div>
              <span className="text-gray-400 text-sm">›</span>
            </a>
          ) : (
            <div key={i} className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0">
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-lg flex-shrink-0">
                {row.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">{row.label}</p>
                <p className="text-sm font-medium text-gray-900">{row.value}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
