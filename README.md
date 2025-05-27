# PerlinLab
🌀 Local Perlin Noise Visualization Server
This project is a local server that provides a simple and clear way to interact with Perlin noise through a minimalist and intuitive user interface (UI).

## 🎯 Key features:  
📊 Real-time visualization of Perlin noise.

🛠️ Simple and easy control over noise parameters.

⚙️ Almost everything is automated — just start the server and open the interface.

🧠 Suitable even for those who are just beginning to explore noise generation.

## 💡 Why it's convenient:  
The project is designed for learning, experimenting, and testing procedural generation. With a minimal number of controls, you can focus on the core — understanding how the Perlin noise algorithm works.

## Installation and running

### Manual installation

#### If you are on Linux
1. Clone the repository:
    ```bash
    git clone https://github.com/Q-Vortex/PerlinLab.git
    # or
    git clone git@github.com:Q-Vortex/PerlinLab.git
    ```
2. Install dependencies:
    ```bash
    # If you don't have node and npm installed:
    sudo apt install -y nodejs npm
    # then
    npm install
    ```
3. Run the server:
    ```bash
    cd backend
    npm run dev
    ```
⚠️ It's important to run the server inside the `backend` folder.

#### If you are on Windows
1. Clone the repository:
    ```cmd
    git clone https://github.com/Q-Vortex/PerlinLab.git
    # or
    git clone git@github.com:Q-Vortex/PerlinLab.git
    ```
2. Install dependencies:
    ```cmd
    npm install
    ```
3. Run the server:
    ```cmd
    cd backend
    npm run dev
    ```
⚠️ It's important to run the server inside the `backend` folder.

#### ⚠️ If you don't have Node.js installed, get it here: [Node.js official website](https://nodejs.org/en)

### Or you can run the setup scripts:

```bash
# If you are on Windows
settup.bat

# If you are on Linux
settup.sh
```

## Technical details
The client side is built with plain JavaScript, while the server side uses Node.js to manage and store user-defined parameters.  
The Perlin noise algorithm was implemented entirely from scratch in JavaScript, without relying on any external libraries. This approach provides full control and a deeper understanding of how the noise is generated.  

For visualization, a pixel-based system was used — each noise value is represented by an individual HTML element with a dynamically assigned background color based on the noise intensity.

## Future improvements
To enhance performance, usability, and functionality, several improvements are planned for future versions of the project:

### Optimized visualization
The current method of rendering noise through individual HTML elements will be replaced with a more efficient approach. The new system will generate an image and directly manipulate its pixel data, significantly improving performance and scalability.

### Additional noise types
Support for other procedural noise algorithms — such as Simplex noise, Value noise, and potentially Worley noise — will be added. This will allow for a wider range of applications and experimentation.

### Export options
Users will be able to export generated noise maps as image files (e.g. PNG) for use in other projects.
Additionally, the tool will support exporting the noise data as code snippets in various programming languages, including C++, C#, JavaScript, and Python. This will allow developers to easily integrate the generated noise into their own applications and game engines.

### Advanced parameter controls
More fine-tuned controls will be introduced, such as octaves, persistence, lacunarity, and seed values — giving users deeper control over noise characteristics.
