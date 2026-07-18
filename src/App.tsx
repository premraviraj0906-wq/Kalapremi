import React from 'react';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Films from './components/Films/Films';
import Events from './components/Events/Events';
import Team from './components/Team/Team';
import Services from './components/Services/Services';
import Connect from './components/Connect/Connect';
import FloatingNav from './components/FloatingNav/FloatingNav';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Films />
        <Events />
        <Team />
        <Services />
        <Connect />
      </main>
    </>
  );
};

export default App;
