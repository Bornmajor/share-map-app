import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MyContextProvider } from './src/context/context';
import StackNav from './src/navigation/StackNav';

export default function App() {
  return (
    <MyContextProvider>
         <StatusBar style="auto" />
         <StackNav/>
    </MyContextProvider>
  
  );
}

