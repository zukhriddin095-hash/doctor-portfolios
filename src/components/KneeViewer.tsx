'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';
import { useI18n } from './I18nProvider';

/** Stylised knee built from procedural geometry. It is an illustration, NOT an anatomically accurate model. */
const V = (pts: number[][]) => pts.map(([x, y]) => new THREE.Vector2(x, y));
const LABELS = [['l1', [0, 2.4, 0]], ['l2', [0, 0.35, 0.95]], ['l3', [-0.9, -0.1, 0.5]], ['l4', [0, -2.4, 0.45]]] as const;

function Knee({ labels }: { labels: boolean }) {
  const g = useRef<THREE.Group>(null);
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const bone = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xe6dccb, roughness: 0.6, side: THREE.DoubleSide }), []);
  const cart = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x2bb3b0, roughness: 0.35, transparent: true, opacity: 0.9, side: THREE.DoubleSide }), []);
  useEffect(() => () => { bone.dispose(); cart.dispose(); }, [bone, cart]);
  const femur = useMemo(() => V([[0, 0.6], [0.6, 0.62], [0.72, 1], [0.55, 1.7], [0.43, 2.4], [0.45, 3.5], [0, 3.5]]), []);
  const tibia = useMemo(() => V([[0, -3.7], [0.32, -3.7], [0.37, -3], [0.42, -2], [0.62, -1], [0.9, -0.55], [0, -0.4]]), []);
  const fibula = useMemo(() => V([[0, -3.4], [0.13, -3.4], [0.15, -1.6], [0.22, -0.8], [0.2, -0.5], [0, -0.5]]), []);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = 0.45 + (reduce ? 0 : Math.sin(clock.elapsedTime * 0.35) * 0.45);
  });
  return (
    <>
      <group ref={g}>
        <mesh material={bone}><latheGeometry args={[femur, 48]} /></mesh>
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * 0.52, 0.5, -0.1]} scale={[0.62, 0.62, 0.74]} material={bone}><sphereGeometry args={[1, 40, 28]} /></mesh>
            <mesh position={[s * 0.52, 0.5, -0.1]} scale={[0.645, 0.645, 0.765]} material={cart}>
              <sphereGeometry args={[1, 40, 16, 0, Math.PI * 2, 1.15, 1.1]} />
            </mesh>
            <mesh position={[s * 0.55, -0.1, 0]} rotation={[Math.PI / 2, 0, s < 0 ? 0.2 * Math.PI : 1.2 * Math.PI]} scale={[1, 1.05, 0.55]} material={cart}>
              <torusGeometry args={[0.44, 0.11, 12, 40, Math.PI * 1.6]} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.38, 0]} scale={[1.32, 0.2, 0.88]} material={bone}><sphereGeometry args={[1, 40, 28]} /></mesh>
        <mesh material={bone}><latheGeometry args={[tibia, 48]} /></mesh>
        <mesh position={[0, -1.15, 0.5]} scale={[0.2, 0.45, 0.22]} material={bone}><sphereGeometry args={[1, 24, 16]} /></mesh>
        <mesh position={[1, 0, -0.15]} material={bone}><latheGeometry args={[fibula, 32]} /></mesh>
        <mesh position={[0, 0.4, 0.88]} scale={[0.46, 0.56, 0.24]} material={bone}><sphereGeometry args={[1, 32, 24]} /></mesh>
        <mesh position={[0, 0.4, 0.76]} scale={[0.4, 0.5, 0.1]} material={cart}><sphereGeometry args={[1, 32, 24]} /></mesh>
        {labels && LABELS.map(([k, p]) => (
          <Html key={k} position={[p[0], p[1], p[2]]} style={{ pointerEvents: 'none' }}><span className="lb2">{t[k]}</span></Html>
        ))}
      </group>
      <hemisphereLight args={[0xffffff, 0x4a5f80, 0.75]} />
      <directionalLight position={[4, 6, 8]} intensity={1} color={0xfff4e6} />
      <directionalLight position={[-6, 1, -4]} intensity={0.8} color={0x6d9bff} />
    </>
  );
}

type Ctl = { reset: () => void; saveState: () => void };

export default function KneeViewer() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const ctl = useRef<Ctl | null>(null);
  const [gl, setGl] = useState<boolean | null>(null);
  const [vis, setVis] = useState(true);
  const [labels, setLabels] = useState(true);
  useEffect(() => {
    try { const c = document.createElement('canvas'); setGl(Boolean(c.getContext('webgl2') || c.getContext('webgl'))); } catch { setGl(false); }
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="stage" id="stage" ref={ref}>
      {gl === true && (
        <Canvas camera={{ position: [0, 0.2, 15], fov: 30 }} dpr={[1, 1.75]} frameloop={vis ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} style={{ position: 'absolute', inset: 0 }} aria-label={t.aKnee} role="img">
          <Knee labels={labels} />
          <OrbitControls ref={(c) => { ctl.current = c as unknown as Ctl | null; c?.saveState(); }} enablePan={false} enableZoom={false}
            minPolarAngle={Math.PI / 2 - 0.6} maxPolarAngle={Math.PI / 2 + 0.6} />
        </Canvas>
      )}
      {gl === false && (
        <svg viewBox="0 0 300 400" role="img" aria-label={t.aKnee}>
          <g fill="#E8DFD0"><path d="M120 10h60l8 130h-76z" /><ellipse cx="125" cy="150" rx="40" ry="38" /><ellipse cx="180" cy="150" rx="40" ry="38" /><path d="M105 205h100l-12 190h-76z" /></g>
          <path d="M95 192h110" stroke="#2bb3b0" strokeWidth="8" strokeLinecap="round" />
        </svg>
      )}
      {gl === true && (
        <div className="tools">
          <button type="button" aria-pressed={labels} onClick={() => setLabels((v) => !v)}>{t.t1}</button>
          <button type="button" aria-label={t.aReset} onClick={() => ctl.current?.reset()}>{t.t2}</button>
        </div>
      )}
      <figcaption>{t.cap}</figcaption>
    </figure>
  );
}
