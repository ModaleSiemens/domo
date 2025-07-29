@echo off
echo Starting development servers...
start "Fastify API" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "SvelteKit" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul
start "Caddy" cmd /k "caddy run --config Caddyfile.dev --watch"
echo All servers started!
echo.
echo Access your app at: http://localhost:3000
echo API available at: http://localhost:3000/api
echo.
echo Press any key to close all servers...
pause >nul
taskkill /f /im node.exe
taskkill /f /im caddy.exe