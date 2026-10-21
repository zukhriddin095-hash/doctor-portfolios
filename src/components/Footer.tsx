import type { Dict } from '@/i18n/get-dictionary';
export function Footer({ t }: { t: Dict }) {
  return (
    <footer>
      <div className="w">
        <span>{t.ft1}</span>
        <span className="flex gap-4">
          <a href="https://t.me/OrtopedT" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://www.instagram.com/reel/Cw9l345MVXQ/?igsh=MWc0cW92anZzNmgwZg%3D%3D" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/watch?v=sCIGPz0YcnA" target="_blank" rel="noopener noreferrer">YouTube</a>
        </span>
        <span>{t.ft2}</span>
      </div>
    </footer>
  );
}
