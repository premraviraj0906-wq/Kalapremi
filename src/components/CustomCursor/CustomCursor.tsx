import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
    }
  }, [x, y]);

  useEffect(() => {
    const links = document.querySelectorAll('a, button, [data-cursor="hover"]');
    const onEnter = () => {
      ringRef.current?.classList.add('hovered');
    };
    const onLeave = () => {
      ringRef.current?.classList.remove('hovered');
    };
    links.forEach(l => {
      l.addEventListener('mouseenter', onEnter);
      l.addEventListener('mouseleave', onLeave);
    });
    return () => {
      links.forEach(l => {
        l.removeEventListener('mouseenter', onEnter);
        l.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
