import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, MapPin, Menu, Dumbbell } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/usersSlice';

import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import LogoCompleto from '../../assets/images/jy.jpg';
import UserDropdown from './Search/userDropdown';

const Header = ({ onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [showAddedBadge, setShowAddedBadge] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const rol = useSelector((state) => state.user.user?.rol);
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  const isLoggedIn = !!user;
  const userName = user?.name || user?.nombre || user?.correo || user?.email || 'Atleta';
  const userProfile = user?.foto_perfil;
  
  const handleLogout = () => dispatch(logoutUser());

  useEffect(() => {
    if (totalCartItems > previousCartCount) {
      setIsCartAnimating(true);
      setShowAddedBadge(true);

      setTimeout(() => setIsCartAnimating(false), 600);
      setTimeout(() => setShowAddedBadge(false), 1500);
    }
    setPreviousCartCount(totalCartItems);
  }, [totalCartItems, previousCartCount]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-50 border-b-2 border-orange-500">
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-600">
          <div className="max-w-[1500px] mx-auto px-4 py-3 flex items-center gap-4">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-white/10 p-3 backdrop-blur-md border-2 border-white/20 transition-all duration-300 hover:border-orange-300 hover:bg-white/20 hover:scale-105 shadow-lg">
                <img
                  src={LogoCompleto}
                  alt="FLUCSA Sports"
                  className="h-12 w-auto object-contain transition-all duration-500 group-hover:brightness-110 drop-shadow-md"
                />
              </div>
            </Link>

            {/* Ubicación */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/15 transition-all cursor-pointer border-2 border-transparent hover:border-orange-300 group">
              <MapPin className="w-5 h-5 text-orange-200 group-hover:text-white transition-colors" />
              <div className="flex flex-col">
                <span className="text-xs text-orange-100 font-medium">Envío a</span>
                <span className="text-sm font-bold text-white">Mérida, Yucatán</span>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-3xl">
              <div className="w-full bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all border-2 border-orange-200">
                <Search />
              </div>
            </div>

            {/* Right section */}
            <div className="hidden lg:flex items-center gap-3">

              <UserDropdown
                userName={userName}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                rol={rol}
                profilePicture={userProfile}
              />

              <div className="px-4 py-2 rounded-lg hover:bg-white/15 transition-all cursor-pointer border-2 border-transparent hover:border-orange-300 group">
                <div className="flex flex-col">
                  <span className="text-xs text-orange-100 font-medium group-hover:text-white transition-colors">Mis</span>
                  <span className="text-sm font-bold text-white">Pedidos</span>
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={onCartToggle}
                className={`relative group px-4 py-2 rounded-lg hover:bg-white/15 transition-all border-2 flex items-center gap-3 ${
                  isCartAnimating ? 'animate-bounce border-green-400 bg-green-500/20' : 'border-transparent hover:border-orange-300'
                }`}
              >
                {isCartAnimating && (
                  <div className="absolute inset-0 bg-green-400/30 rounded-lg animate-ping"></div>
                )}
                <div className="relative">
                  <ShoppingCart
                    className={`w-8 h-8 relative z-10 transition-all stroke-[2.5] ${
                      isCartAnimating ? 'text-green-300' : 'text-white'
                    }`}
                  />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg text-[11px] border-2 border-white">
                      {totalCartItems}
                    </span>
                  )}
                  {showAddedBadge && (
                    <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce shadow-lg border-2 border-white">
                      +
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-orange-100 font-medium group-hover:text-white transition-colors">Carrito</span>
                  <span className="text-sm font-bold text-white">
                    {totalCartItems > 0 ? `${totalCartItems} productos` : 'Vacío'}
                  </span>
                </div>
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button onClick={onCartToggle} className="relative p-2 rounded-lg hover:bg-white/15 transition-all border-2 border-transparent hover:border-orange-300">
                <ShoppingCart className="w-6 h-6 text-white stroke-[2.5]" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-orange-500 to-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                    {totalCartItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-white/15 transition-all border-2 border-transparent hover:border-orange-300"
              >
                <Menu className="w-6 h-6 text-white stroke-[2.5]" />
              </button>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="hidden lg:block bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t-2 border-orange-500/30">
          <div className="max-w-[1500px] mx-auto px-4">
            <Navigation rol={rol} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 px-4 pb-3">
          <div className="bg-white rounded-xl shadow-xl border-2 border-orange-200">
            <Search />
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-orange-600 via-orange-500 to-red-600 w-72 max-w-[85vw] shadow-2xl overflow-y-auto border-r-2 border-orange-400">
            <div className="sticky top-0 bg-gradient-to-r from-orange-700 to-red-700 p-4 flex items-center justify-between border-b-2 border-orange-400 z-10 shadow-lg">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-base">Menú Deportivo</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-200 active:scale-95 border border-white/30"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-5">
              <Navigation
                isMobile
                onLinkClick={() => setIsMenuOpen(false)}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                rol={rol}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;