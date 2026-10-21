import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ink: 'var(--ink)', mute: 'var(--mute)', line: 'var(--line)', accent: 'var(--blue)' } } },
  plugins: [],
};
export default config;
