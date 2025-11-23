import { useCart } from './CartContext';
import './CartModal.css';

export default function CartModal() {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Reserve</h2>
          <button className="close-button" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cellar is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-meta">{item.year} • {item.type}</p>
                    <div className="cart-item-price-row">
                      <span className="quantity">Qty: {item.quantity}</span>
                      <span className="price">€{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>€{cartTotal}</span>
              </div>
              <button className="checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

