import React, { Suspense, lazy } from 'react';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Hero from './components/Hero/Hero';
import FloatingNav from './components/FloatingNav/FloatingNav';
import './App.css';

// Lazy load components below the fold
const About = lazy(() => import('./components/About/About'));
const Films = lazy(() => import('./components/Films/Films'));
const Events = lazy(() => import('./components/Events/Events'));
const Team = lazy(() => import('./components/Team/Team'));
const Services = lazy(() => import('./components/Services/Services'));
const Connect = lazy(() => import('./components/Connect/Connect'));

const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <FloatingNav />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '50vh' }} />}>
          <About />
          <Films />
          <Events />
          <Team />
          <Services />
          <Connect />
        </Suspense>
      </main>
    </>
  );
};

export default App;
