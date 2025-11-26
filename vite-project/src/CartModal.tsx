import { useCart } from './CartContext';

export default function CartModal() {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-[5px] z-[1000] flex justify-end animate-[fadeIn_0.3s_ease]" onClick={() => setIsCartOpen(false)}>
      <div className="w-full max-w-[400px] bg-[#111] border-l border-white/15 shadow-[-5px_0_30px_rgba(0,0,0,0.8)] h-full flex flex-col animate-[slideInRight_0.3s_cubic-bezier(0.4,0,0.2,1)]" onClick={e => e.stopPropagation()}>
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/10">
          <h2 className="font-['Playfair_Display',serif] m-0 text-2xl text-white">Your Reserve</h2>
          <button className="bg-transparent border-none text-white text-4xl p-0 leading-none cursor-pointer opacity-70 transition-opacity duration-200 hover:opacity-100" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex-1 flex justify-center items-center text-white/30 font-['Playfair_Display',serif] italic text-xl">
            <p>Your cellar is empty.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-white/5 relative last:border-b-0">
                  <div className="w-[60px] h-[80px] shrink-0 bg-[radial-gradient(circle_at_bottom,rgba(189,13,26,0.15),transparent_70%)] rounded-lg flex justify-center items-center">
                    <img src={item.image} alt={item.name} className="h-full w-auto object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-['Playfair_Display',serif] m-0 mb-1 text-lg text-white">{item.name}</h3>
                    <p className="text-xs text-white/50 m-0 mb-2 uppercase tracking-wider">{item.year} • {item.type}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Qty: {item.quantity}</span>
                      <span className="font-bold text-[#bd0d1a]">€{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button 
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-white/10 rounded-full border-none text-white text-lg leading-none p-0 cursor-pointer transition-colors duration-200 hover:bg-[#bd0d1a]/50"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-8 bg-[#0a0a0a] border-t border-white/10">
              <div className="flex justify-between items-center mb-6 font-['Playfair_Display',serif] text-xl text-white">
                <span>Total</span>
                <span>€{cartTotal}</span>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 300);
                }}
                className="w-full p-4 bg-[#bd0d1a] text-white border-none font-['Playfair_Display',serif] uppercase tracking-widest text-base cursor-pointer transition-colors duration-300 hover:bg-[#9e0b16]"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
