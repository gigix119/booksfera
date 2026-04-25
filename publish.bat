@echo off
cd /d "%~dp0"
echo.
echo === Booksfera — publikuj zmiany ===
echo.

git add .
if errorlevel 1 (
  echo BLAD: git add nie powiodl sie. Czy git jest zainstalowany i repozytorium skonfigurowane?
  pause
  exit /b 1
)

set "msg=Aktualizacja - %date% %time%"
git commit -m "%msg%"
if errorlevel 1 (
  echo INFO: Brak zmian do zacommitowania.
  pause
  exit /b 0
)

git push
if errorlevel 1 (
  echo BLAD: git push nie powiodl sie. Sprawdz polaczenie z GitHub.
  pause
  exit /b 1
)

echo.
echo OK! Zmiany wgrane na GitHub. Cloudflare Pages zbuduje strone w ~1 minute.
echo.
pause
