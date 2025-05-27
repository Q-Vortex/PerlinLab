const fs = require('fs');

const rootPath = "/mnt/a/web/mapGen/";

function saveData(data) {
  const jsonData = fs.readFileSync(`${rootPath}/data/perlin_noise_settup.json`, 'utf-8');
  const saved_data = JSON.parse(jsonData);

  data.layers.forEach(el => {
    const existingLayer = saved_data.layers.find(layer => layer.code === el.code);  

    if (existingLayer) {
      existingLayer.name = el.name;
      existingLayer.color = el.color;
      existingLayer.scale = el.scale;
    } else {
      saved_data.layers.push({
        code: el.code,
        name: el.name,
        color: el.color,
        scale: el.scale
      });
    }
  });


  saved_data.layers = saved_data.layers.filter(el_s => 
    data.layers.some(el => el.code === el_s.code)
  );

  
  saved_data.parameters = data.parameters;

  fs.writeFileSync(`${rootPath}/data/perlin_noise_settup.json`, JSON.stringify(saved_data, null, 2));
  console.log('Data saved successfully.');
}

module.exports = {
  saveData,
};