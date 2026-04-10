import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App';
import { loadMoonbit } from './mbt/ffi';

// wasm をロードしてから React をマウントする
loadMoonbit().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}).catch((e) => {
  console.error('Failed to load moonbit.wasm:', e);
  // フォールバック: wasm なしで起動
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
