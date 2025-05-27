@echo off
if exist "..\mapGen\init.sh" (
    echo Initializing project...

    call npm install
    if %errorlevel% equ 0 (
        call cd backend
        call npm run dev
    ) else (
        echo npm install failed, attempting to install nodejs and npm...
        echo You must install Node.js and npm manually on Windows.
        echo For instructions, visit my GitHub page: https://github.com/Q-Vortex/PerlinLab
    )
) else (
    echo Please ensure you are in the correct directory.
)
