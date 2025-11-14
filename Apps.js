import AppNavigator from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

export default function Apps() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '448277369292-bna7lft56d6drat6hq5q06471cidu02c.apps.googleusercontent.com',
    });
  }, []);
  
  return <AppNavigator />;
}
