import { useState } from 'react'
import { signIn } from '../../services/auth'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
    } catch (err) {
      setError('Email o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="text-4xl">🍔</span>
          <h1 className="text-lg font-medium text-gray-900 mt-2">Panel Admin</h1>
          <p className="text-sm text-gray-400">Del Bajón</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400"
          />
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="text-white rounded-xl py-3 text-sm font-medium mt-1 disabled:opacity-60"
            style={{ background: '#B91C1C' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
