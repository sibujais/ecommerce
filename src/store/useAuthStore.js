import { create } from 'zustand';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { storage } from '../utils/storage';

export const useAuthStore = create(set => ({
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
      storage.set('user', JSON.stringify(userInfo));
      
      set({ user: userInfo, loading: false });
    } catch (err) {
      const dummy = {
        uid: 'dummy_user_001',
        name: 'Guest User',
        email: 'guest@example.com',
        photo: 'https://picsum.photos/id/507/400/500',
      };

      storage.set('user', JSON.stringify(dummy));
      set({ user: dummy, loading: false, error: null });
    }
  },

  logout: async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      storage.delete('user');
    }

    set({ user: null });
  },
}));
