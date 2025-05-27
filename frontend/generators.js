let mapS = {
    x: 128,
    y: 128
}

let param = {
    noise: 0.04,
    seed: 0
}

function createMap() {
    for (let i = 0; i < mapS.y * mapS.x; ++i) {
        const el = document.createElement('div');
        el.classList.add('el');
        document.querySelector('.map').append(el);
    }
}

function deleteMap() {
    const map = document.querySelector('.map');
    while (map.firstChild) {
        map.removeChild(map.firstChild);
    }
}

function resizeMap() {
    deleteMap();
    createMap();
    const map = document.querySelector('.map');

    map.style.gridTemplateColumns = `repeat(${mapS.x}, 1fr)`;
    map.style.gridTemplateRows = `repeat(${mapS.y}, 1fr)`;
}

function rnd(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function createEl(color, index) {
    document.querySelector('.map').children[index].style.background = color;
}

function contains(el, index) {
    if (document.querySelector('.map').children[index].style.background == `var(${el})`) {
        return true;
    }
    return false;
}

function rndSeedgen() {
    param.seed = Math.floor(Math.random() * 1000000);
    document.querySelector('.input_seed').value = param.seed;
}

function genSeed(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;

    return function() {
        value = value * 16807 % 2147483647;
        return (value - 1) / 2147483646;
    };
}

let grad_table = [];
let perm = [];

function grad_table_gen() {
    const PI = Math.PI;
    const size = mapS.x * mapS.y;
    const random = genSeed(param.seed);

    for (let i = 0; i < size; ++i) {
        let angle = (i / size) * 2 * PI;
        grad_table.push({
            x: Math.cos(angle), 
            y: Math.sin(angle)
        });
        perm.push(i);
    }

    for (let i = size - 1; i > 0; --i) {
        const j = Math.floor(random() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
    }

    for (let i = 0; i < size; ++i) {
        perm.push(perm[i]);
    }
}

function get_gradient(x, y) {
    size = mapS.x * mapS.y;
    const idx = perm[(x + perm[y % size]) % size];
    return grad_table[idx];
}

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
    return a + t * (b - a);
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

function perlin_noise(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);

    const xf = x - xi;
    const yf = y - yi;

    const grad00 = get_gradient(xi, yi);
    const grad01 = get_gradient(xi, yi + 1);
    const grad10 = get_gradient(xi + 1, yi);
    const grad11 = get_gradient(xi + 1, yi + 1);

    const offset00 = {x: xf, y: yf};
    const offset10 = {x: xf - 1,y: yf};
    const offset01 = {x: xf, y: yf - 1};
    const offset1 = {x: xf - 1,y: yf - 1};

    const dot00 = dot(grad00, offset00)
    const dot01 = dot(grad01, offset01);
    const dot10 = dot(grad10, offset10);
    const dot11 = dot(grad11, offset1);

    const u = fade(xf);
    const v = fade(yf);

    const lerp_x0 = lerp(dot00, dot10, u);
    const lerp_x1 = lerp(dot01, dot11, u);
    const value = lerp(lerp_x0, lerp_x1, v);

    return value;
}

function perlin_noise_gen(frequency) {
    grad_table_gen();

    for (let y = 0; y < mapS.y; ++y) {
        for (let x = 0; x < mapS.x; ++x) {
            let index = x + mapS.x * y;
            let value = perlin_noise(x * frequency, y * frequency);

            let normalizedValue = (value + 1) / 2;

            const layers = Array.from(document.querySelectorAll('.layer'))
              .map(layer => ({
                color: layer.querySelector('.layer_color').value,
                scale: parseFloat(layer.querySelector('.layer_scale').value)
              }))
              .sort((a, b) => a.scale - b.scale);
          
            for (let i = 0; i < layers.length; i++) {
              if (normalizedValue < layers[i].scale) {
                createEl(layers[i].color, index);
                break; 
              }
            }
        }
    }
    grad_table = [];
    perm = [];
}

function generate() {
    resizeMap();
    perlin_noise_gen(param.noise);
}
generate()