import React from 'react';
import Html from './components/Html';
import AppRoutes from './routes/Router';

const App = () => {
  return (
    <Html title="React SSR Demo">
      <AppRoutes />
    </Html>
  );
};

export default App;
