if [ -f ../mapGen/init.sh ]; then
  echo "Initializing project..."

  npm install

  if [ $? -eq 0 ]; then
    cd backend
    npm run dev
  else
    echo "npm install failed. Attempting to install Node.js and npm..."
    sudo apt install -y nodejs npm
    npm run dev
  fi
else
  echo "Please ensure you are in the correct directory."
fi

