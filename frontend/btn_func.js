let israndomSeed = true;

if (israndomSeed) {
    rndSeedgen();
}

function setBorder() {
    document.querySelectorAll('.el').forEach(el => el.classList.toggle('bordered'));
}

document.querySelector('.border_set').addEventListener('click', () => {
    setBorder();
});

document.querySelector('.update').addEventListener('click', () => {
    if (israndomSeed) {
        rndSeedgen();
    }
    generate()
});

function removeAllLayers() {
    Array.from(document.querySelector('.layers').children).forEach(el => el.remove());
}

function addParam(param) {
    document.querySelector('.input_size').value = param.map_size || 128;
    document.querySelector('.input_noise').value = param.noise || 0.04;
    document.querySelector('.input_seed').value = param.seed || 0;
    document.querySelector('#random_seed').checked = param.random_seed || false;
    document.querySelector('#auto_update').checked = param.auto_update || false;

    if (param.bordered) {
        setBorder();
    }

}

let layerN;
function addLayer(nameVal, colorVal, scaleVal, code) {
    
    Array.from(document.querySelectorAll('.layer')).forEach((el, index) => {
        layerN = index + 2;
    });

    const layer = document.createElement('div');

    layer.classList.add('layer', code || `item-${layerN}`);

    document.querySelector('.layers').append(layer);

    const color = document.createElement('input');
    color.type = 'color';
    color.value = colorVal || '#000000';
    color.classList.add('layer_color');
    
    layer.append(color);

    const name = document.createElement('input');
    name.type = 'text';
    name.value = nameVal || `Layer ${layerN}`;
    name.classList.add('layer_name');
    layer.append(name);

    const scale = document.createElement('input');
    scale.type = 'number';
    scale.classList.add('layer_scale');
    scale.value = scaleVal || 1;
    scale.max = 1;
    scale.min = 0;
    scale.step = 0.01;
    layer.append(scale);

    const remove = document.createElement('button');
    remove.classList.add('remove_layer');
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    layer.append(remove);

    document.querySelector('.layers_num').textContent = layerN;
}

document.querySelector('.add_layer').addEventListener('click', () => {
    addLayer();
});

document.querySelector('.layers').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove_layer')) {
        e.target.parentElement.remove();
        layerN--;
        Array.from(document.querySelectorAll('.layer_name')).forEach((el, index) => {
            if (el.value.includes('Layer'))
                el.value = `Layer ${index + 1}`;
        });
        document.querySelector('.layers_num').textContent = layerN;
    }
});

let lastScale = window.devicePixelRatio;

document.querySelector('.settings_container').style.scale = `${1.3 / lastScale}`;

function checkScale() {
  const currentScale = window.devicePixelRatio;
  if (currentScale !== lastScale) {
    lastScale = currentScale;
    let scale = 1.3 / currentScale;
    
    document.querySelector('.settings_container').style.scale = `${scale}`;
  }
}

window.addEventListener('resize', checkScale);

let isMiddleMouseDown = false;
let lastX = null;
let lastY = null;

document.addEventListener('mousedown', function(event) {
  if (event.button === 1) {
    this.body.style.cursor = 'grabbing';
    isMiddleMouseDown = true;
    lastX = event.clientX;
    lastY = event.clientY;
    event.preventDefault();
  }
});

document.addEventListener('mouseup', function(event) {
  if (event.button === 1) {
    isMiddleMouseDown = false;
    lastX = null;
    lastY = null;
    this.body.style.cursor = 'default';
  }
});

window.addEventListener('mousemove', (event) => {
    if (!isMiddleMouseDown) return;

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    const zoom = document.querySelector('.zoom');
    const style = getComputedStyle(zoom);

    const newLeft = parseFloat(style.left) + deltaX;
    const newTop = parseFloat(style.top) + deltaY;

    zoom.style.left = `${newLeft}px`;
    zoom.style.top = `${newTop}px`;

    lastX = event.clientX;
    lastY = event.clientY;
});

mapS.x = parseInt(document.querySelector('.input_size').value) || 128;
mapS.y = parseInt(document.querySelector('.input_size').value) || 128;

document.querySelector('.input_size').addEventListener('input', (event) => {
   mapS.x = parseInt(event.target.value) || 128;
   mapS.y = parseInt(event.target.value) || 128;
});

document.querySelector('.input_noise').addEventListener('input', (event) => {
    param.noise = parseFloat(event.target.value) || 0.04;

    if (document.querySelector('#auto_update').checked) {
        generate();
    }
});


document.querySelector('.input_seed').addEventListener('input', (event) => {
    if (!document.querySelector('#random_seed').checked)
        param.seed = parseInt(event.target.value) || 0;

    if (document.querySelector('#auto_update').checked) {
        generate();
    }
});

document.querySelector('#random_seed').addEventListener('change', (event) => {
    israndomSeed = event.target.checked;
    if (israndomSeed) {
        rndSeedgen();
    }

    if (document.querySelector('#auto_update').checked) {
        generate();
    }
});

document.querySelector('.save').addEventListener('click', () => {
    data = {layers: [], parameters: {}};
    document.querySelectorAll('.layer').forEach((el) => {
        const name = el.querySelector('.layer_name').value;
        const color = el.querySelector('.layer_color').value;
        const scale = parseFloat(el.querySelector('.layer_scale').value) || 1;
        const code = el.classList[1];

        data.layers.push({
            code: code,
            name: name,
            color: color,
            scale: scale
        });
    });

    const mapSize = document.querySelector('.input_size').value;
    const noise = document.querySelector('.input_noise').value;
    const seed = document.querySelector('.input_seed').value;
    const randomSeed = document.querySelector('#random_seed').checked;
    const autoUpdate = document.querySelector('#auto_update').checked;
    const bordered = document.querySelector('.border_set').classList.contains('bordered');

    data.parameters = {
        map_size: mapSize,
        noise: noise,
        seed: seed,
        random_seed: randomSeed,
        auto_update: autoUpdate,
        bordered: bordered
    };

    sendData(data);
});

document.querySelector('.load').addEventListener('click', () => {
    data = {};
    sendData(data);
});