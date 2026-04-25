@echo off
title Booksfera — Auto-publish
cd /d "%~dp0"
echo.
echo === Booksfera — auto-publish wlaczony ===
echo Zapisz lub usun ksiazke w generatorze — zmiany pojawia sie
echo na stronie automatycznie w ciagu ~1 minuty.
echo.
echo Zamknij to okno zeby zatrzymac auto-publish.
echo.
node scripts/watch.mjs
pause
