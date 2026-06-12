'use client';

import { useState, useEffect } from 'react';
import StudioClient from '../StudioClient';

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <StudioClient />;
}
