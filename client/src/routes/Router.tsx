import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/Home'));

const ROUTES = [
  {
    path: '/',
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
  },
];

const AppRoutes = () => {
  if (typeof window === 'undefined') {
    //윈도우창에서 실행되고 있지 않을 경우, 즉, 서버에 작동중인 경우
    return (
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
