import { storage } from '../redux/mmkv';

export const persistCart = (cartItems: any[]) => {
  storage.set('cart', JSON.stringify(cartItems));
};

export const getPersistedCart = (): any[] => {
  const value = storage.getString('cart');
  return value ? JSON.parse(value) : [];
};
