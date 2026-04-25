/**
 * Auto-publish watcher — obserwuje folder projektu.
 * Gdy zmieni się lub zniknie plik .html, automatycznie robi git commit + push.
 */
import { watch } from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

let debounce;

console.log('');
console.log('=== Booksfera — auto-publish ===');
console.log('Obserwuję zmiany w plikach .html...');
console.log('Zamknij to okno żeby zatrzymać.\n');

watch(root, { recursive: false }, (event, filename) => {
  if (!filename || !filename.endsWith('.html')) return;
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`Zmiana: ${filename} — commit i push...`);
    exec(
      'git add -A && git commit -m "Auto: aktualizacja ksiazek" && git push',
      { cwd: root },
      (err, stdout) => {
        const out = (stdout || '').trim();
        if (out.includes('nothing to commit')) {
          console.log('Brak nowych zmian.\n');
        } else if (err && !out.includes('nothing to commit')) {
          console.error('Błąd:', err.message, '\n');
        } else {
          console.log('✓ Wgrano na GitHub! Strona zaktualizuje się w ~1 min.\n');
        }
      }
    );
  }, 2000);
});
