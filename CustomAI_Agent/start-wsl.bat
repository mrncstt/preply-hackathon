@echo off
echo === Starting Custom AI Agent in WSL (port 8100) ===
echo.
echo Prerequisites:
echo   1. WSL Ubuntu installed: wsl --install Ubuntu
echo   2. Go + Node installed in WSL: sudo apt install golang-go nodejs npm build-essential
echo   3. Agora SDK installed: cd go-audio-subscriber/sdk ^&^& bash scripts/install_agora_sdk.sh
echo   4. Audio subscriber built: cd go-audio-subscriber ^&^& make build
echo   5. Node deps installed: cd node ^&^& npm install
echo.

if "%LLM_API_KEY%"=="" (
    echo ERROR: Set LLM_API_KEY first: set LLM_API_KEY=your-openai-key
    pause
    exit /b 1
)
if "%THYMIA_API_KEY%"=="" (
    echo WARNING: THYMIA_API_KEY not set. Thymia biomarkers will be disabled.
)

wsl -d Ubuntu -e bash -c "cd /mnt/g/Proj/preply-hackathon/CustomAI_Agent/node && export PORT=8100 && export WAX_ENABLED=true && export WAX_HOST=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}') && export WAX_PORT=8080 && export THYMIA_ENABLED=true && export THYMIA_API_KEY=%THYMIA_API_KEY% && export LLM_API_KEY=%LLM_API_KEY% && echo WAX_HOST=$WAX_HOST && node custom_llm.js"
