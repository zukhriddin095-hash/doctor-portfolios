'use client';
import dynamic from 'next/dynamic';

// Heavy 3D bundle: client-only, loaded after the page shell.
const KneeViewer = dynamic(() => import('./KneeViewer'), { ssr: false, loading: () => <figure className="stage" aria-busy="true" /> });
export default function KneeLoader() { return <KneeViewer />; }
