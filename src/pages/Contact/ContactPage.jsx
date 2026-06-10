import { MessageCircle, Instagram, Clock, MapPin } from 'lucide-react'
import storeConfig from '../../config/store'

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016!2d-58.3816!3d-34.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzEzLjMiUyA1OMKwMjInNTMuOCJX!5e0!3m2!1ses!2sar!4v1234567890'

export default function ContactPage() {
  const wspMsg = encodeURIComponent('Hola! Tengo una consulta sobre el menú 👋')

  return (
    <div className="bg-gray-50 min-h-screen pb-8">

      {/* Header */}
      <div className="px-4 py-5" style={{ background: '#B91C1C' }}>
        <h2 className="text-white font-bold text-lg">Contacto</h2>
        <p className="text-red-200 text-sm mt-0.5">Encontranos y escribinos</p>
      </div>

      {/* Mapa embebido */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden shadow-md border border-gray-200">
        <iframe
          title="Ubicación Del Bajón"
          src={MAPS_EMBED_URL}
          width="100%"
          height="200"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="bg-white px-4 py-3 flex items-center gap-2">
          <MapPin size={16} color="#B91C1C" />
          <span className="text-sm text-gray-700">{storeConfig.address}</span>
        </div>
      </div>

      {/* Cards de contacto */}
      <div className="mx-4 mt-4 flex flex-col gap-3">

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${storeConfig.whatsapp}?text=${wspMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex items-center gap-4 active:bg-gray-50 transition-colors"
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
            <MessageCircle size={22} color="white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">WhatsApp</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{storeConfig.phone}</p>
            <p className="text-xs text-green-600 mt-0.5">Tocar para abrir chat</p>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </a>

        {/* Instagram */}
        <a
          href={storeConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex items-center gap-4 active:bg-gray-50 transition-colors"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            <Instagram size={22} color="white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Instagram</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">@del.bajon</p>
            <p className="text-xs text-pink-500 mt-0.5">Ver perfil</p>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </a>

        {/* Horarios */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7' }}>
            <Clock size={22} color="#D97706" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Horarios</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{storeConfig.hours}</p>
            <p className="text-xs text-yellow-600 mt-0.5">Delivery disponible</p>
          </div>
        </div>

      </div>
    </div>
  )
}
