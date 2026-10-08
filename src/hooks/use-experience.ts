import { useEffect, useState } from 'react';
export function useExperience() {
 const [progress, setProgress] = useState(0);
 const [reduced, setReduced] = useState(false);
 useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateMotion = () => setReduced(media.matches);
  const update = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
  updateMotion(); update();
  media.addEventListener('change', updateMotion); window.addEventListener('scroll', update, { passive: true });
  return () => { media.removeEventListener('change', updateMotion); window.removeEventListener('scroll', update); };
 }, []);
 return { progress, reduced };
}