import AppNavigator from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
export default function Apps() {
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '448277369292-nk0at4r1rloplofeoadaauosdu5mro4v.apps.googleusercontent.com',
    });
  }, []);

  return <AppNavigator />;
}
