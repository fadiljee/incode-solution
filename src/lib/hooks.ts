'use client';
import { useEffect, useState } from 'react';

const WORDS = [
  'Pengerjaan Skripsi',
  'Sistem Kasir UMKM',
  'Company Profile',
  'Debugging Kode',
  'Landing Page',
  'Aplikasi Internal',
];

export function useTypewriter(speed = 80, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const word = WORDS[index];

    if (!deleting && sub < word.length) {
      const t = setTimeout(() => {
        setText(word.slice(0, sub + 1));
        setSub((s) => s + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    if (!deleting && sub === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && sub > 0) {
      const t = setTimeout(() => {
        setText(word.slice(0, sub - 1));
        setSub((s) => s - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % WORDS.length);
    }
  }, [sub, deleting, index, speed, pause]);

  return text;
}

export function useInView(threshold = 0.15) {
  const [ref, setRef] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, inView };
}
