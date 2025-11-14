import { create } from 'zustand';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { storage } from '../utils/storage';

export const useAuthStore = create((set) => ({
  user: storage.getString('user')
    ? JSON.parse(storage.getString('user'))
    : null,

  loading: false,
  error: null,

  login: async () => {
    try {
      set({ loading: true, error: null });

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      storage.set('user', JSON.stringify(userInfo));
      set({ user: userInfo, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message || 'Login failed' });
    }
  },

  logout: () => {
    GoogleSignin.signOut();
    storage.delete('user');
    set({ user: null });
  },
}));

