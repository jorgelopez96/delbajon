import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)
const initialState = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.payload) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.payload.cartId ? { ...i, qty: action.payload.qty } : i
        ),
      }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product, qty, additionals) => {
    const extrasTotal = additionals.reduce((s, a) => s + a.price, 0)
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        cartId: `${product.id}-${Date.now()}`,
        product,
        qty,
        additionals,
        unitPrice: product.price + extrasTotal,
        total: (product.price + extrasTotal) * qty,
      },
    })
  }

  const removeItem = (cartId) => dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  const updateQty = (cartId, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } })
  const clearCart = () => dispatch({ type: 'CLEAR' })
  const totalItems = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.total, 0)

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
