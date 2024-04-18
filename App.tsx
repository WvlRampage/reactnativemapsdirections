import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import Map from './src/components/Map';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
      <Map />
  );
}


export default App;
