const steps = [
  {
    num: 1,
    title: 'Elegí tus productos',
    desc: 'Explorá el menú, encontrá lo que te gusta y tocá el botón para agregarlo al carrito.',
  },
  {
    num: 2,
    title: 'Personalizá tu pedido',
    desc: 'Al abrir un producto podés agregar extras como panceta adicional, queso extra, salsas y más.',
  },
  {
    num: 3,
    title: 'Revisá el carrito',
    desc: 'Tocá "Mi pedido" para ver el resumen. Podés quitar ítems antes de confirmar.',
  },
  {
    num: 4,
    title: 'Elegí cómo pagás y enviá',
    desc: 'Seleccioná efectivo o transferencia, ingresá tu nombre y dirección, y el pedido se envía directo a nuestro WhatsApp.',
  },
]

export default function HowToPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-4 py-6 text-center" style={{ background: '#B91C1C' }}>
        <h2 className="text-white text-xl font-medium">¿Cómo hago mi pedido?</h2>
        <p className="text-red-300 text-sm mt-1">En 4 pasos simples, tu hamburguesa en camino</p>
      </div>

      <div className="p-4 flex flex-col gap-4 mt-2">
        {steps.map(step => (
          <div key={step.num} className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-base font-medium flex-shrink-0"
              style={{ background: '#FEE2E2', color: '#B91C1C' }}
            >
              {step.num}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{step.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
