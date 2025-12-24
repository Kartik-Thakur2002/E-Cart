import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import { getPersistedCart, persistCart } from '../utilities/persistence';
import { RootState } from '../redux/store';

const CartPersistenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Restore cart from MMKV on app start
  useEffect(() => {
    const persisted = getPersistedCart();
    if (persisted.length) {
      dispatch(setCart(persisted));
    }
  }, [dispatch]);

  // Persist cart to MMKV whenever it changes
  useEffect(() => {
    persistCart(cartItems);
  }, [cartItems]);

  return <>{children}</>;
};

export default CartPersistenceProvider;
