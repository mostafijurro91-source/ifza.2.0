import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Heart, Star, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';
import { Screen, Product } from '../types';

export default function ProductDetail({ setScreen, product, onAddToCart, onAddToFittingRoom, savedLooks = [], toggleSavedLook }: { setScreen: (s: Screen) => void, product: Product | null, onAddToCart: (p: Product, size: string, color: string) => void, onAddToFittingRoom: (p: Product) => void, savedLooks?: string[], toggleSavedLook?: (id: string) => void }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState('S');
  const [selectedColor, setSelectedColor] = React.useState('Neon');
  
  const isSaved = product ? savedLooks.includes(product.id) : false;

  const [showReviewForm, setShowReviewForm] = React.useState(false);
  const [reviewText, setReviewText] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviews, setReviews] = React.useState([
    { id: 1, user: 'Aisha Rahman', rating: 5, text: 'Beautiful product, exactly as shown in the picture. The quality is amazing!', date: '2 days ago' },
    { id: 2, user: 'Nusrat Jahan', rating: 4, text: 'Good quality but delivery took a bit long. Overall satisfied.', date: '1 week ago' }
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    
    const newReview = {
      id: Date.now(),
      user: 'Guest User',
      rating: reviewRating,
      text: reviewText,
      date: 'Just now'
    };
    
    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewRating(5);
    setShowReviewForm(false);
  };

  if (!product) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-slate-900">
        <p>Product not found</p>
        <button onClick={() => setScreen('home')} className="ml-4 text-primary underline">Go Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleTryOn = () => {
    onAddToFittingRoom(product);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 overflow-x-hidden text-slate-900">
      <main className="flex-1 pb-32 max-w-7xl mx-auto w-full md:grid md:grid-cols-2 md:gap-8 md:px-8 md:pt-8">
        <div className="relative px-4 py-2 md:p-0">
          <div 
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-slate-100 rounded-xl aspect-[3/4] shadow-inner md:rounded-2xl border border-slate-200"
            style={{ backgroundImage: `url("${product.image}")` }}
          >
            <div className="flex justify-center gap-2 p-5 mb-2">
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-2 h-1 rounded-full bg-slate-300"></div>
              <div className="w-2 h-1 rounded-full bg-slate-300"></div>
              <div className="w-2 h-1 rounded-full bg-slate-300"></div>
            </div>
          </div>
          {product.isVirtualReady && (
            <div className="absolute top-6 left-8 bg-blue-600/90 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm md:top-4 md:left-4">
              <Sparkles className="size-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Virtual Ready</span>
            </div>
          )}
        </div>

        <div className="md:flex md:flex-col md:justify-center">
          <div className="px-4 pt-4 md:px-0 md:pt-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-primary font-semibold text-sm tracking-wide uppercase">{product.category}</p>
                <h1 className="text-slate-900 text-2xl font-bold leading-tight mt-1 md:text-4xl">{product.name}</h1>
              </div>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded text-primary">
                <Star className="size-3 fill-primary" />
                <span className="text-sm font-bold">4.8</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mt-3">
              <h3 className="text-primary text-2xl font-bold md:text-3xl">৳{product.price.toFixed(2)}</h3>
              {product.originalPrice && (
                <>
                  <span className="text-slate-400 line-through text-sm md:text-base">৳{product.originalPrice.toFixed(2)}</span>
                  <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="px-4 mt-8 md:px-0">
            <h4 className="text-slate-900 font-bold mb-3">Color</h4>
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedColor('Neon')}
                className={`size-8 rounded-full bg-primary ${selectedColor === 'Neon' ? 'ring-2 ring-primary ring-offset-2 ring-offset-slate-50' : ''}`}
              ></button>
              <button 
                onClick={() => setSelectedColor('Blue')}
                className={`size-8 rounded-full bg-blue-500 ${selectedColor === 'Blue' ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-50' : ''}`}
              ></button>
              <button 
                onClick={() => setSelectedColor('Pink')}
                className={`size-8 rounded-full bg-pink-500 ${selectedColor === 'Pink' ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-slate-50' : ''}`}
              ></button>
              <button 
                onClick={() => setSelectedColor('Onyx')}
                className={`size-8 rounded-full bg-slate-900 ${selectedColor === 'Onyx' ? 'ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50' : ''}`}
              ></button>
            </div>
          </div>

          <div className="px-4 mt-8 md:px-0">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-slate-900 font-bold">Size</h4>
              <button className="text-primary text-sm font-medium underline">Size Guide</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-shrink-0 min-w-[56px] h-12 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                    selectedSize === size 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 mt-8 md:px-0">
            <h4 className="text-slate-900 font-bold mb-2">Description</h4>
            <p className="text-slate-500 text-sm leading-relaxed md:text-base">
              Elevate your style with our signature {product.name}. Crafted from premium materials with a vibrant finish. Perfect for any occasion.
            </p>
          </div>

          <div className="px-4 mt-8 mb-8 md:px-0">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-slate-900 font-bold">Reviews ({reviews.length})</h4>
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-primary text-sm font-medium underline"
              >
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`size-6 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-primary"
                    rows={3}
                    placeholder="What did you like or dislike?"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold w-full"
                >
                  Submit Review
                </button>
              </form>
            )}

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-bold text-sm">{review.user}</h5>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`size-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 w-full z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 pb-8 md:static md:bg-transparent md:border-none md:p-0 md:mt-8 md:max-w-7xl md:mx-auto md:px-8">
        <div className="flex gap-3 md:max-w-md md:ml-auto">
          <button 
            onClick={handleTryOn}
            className="flex-1 bg-slate-100 text-slate-900 border border-slate-200 h-14 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all hover:bg-slate-200"
          >
            <Sparkles className="size-5" />
            Try in Room
          </button>
          <button 
            onClick={handleAddToCart}
            className={`flex-[1.5] h-14 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${isAdded ? 'bg-emerald-500 text-white' : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'}`}
          >
            <ShoppingBag className="size-5" />
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
