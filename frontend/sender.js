data = {}
function sendData(data) { 
    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error(`ERR HTTP: ${response.status}`);
      return response.json();
    })
    .then(result => {
        return dataMg(result);
    })
    .catch(error => {
      console.error('ERR:', error);
    });
    data = {};
}
sendData(data);

function dataMg(jsonData) {
    
    removeAllLayers();
    jsonData.data.layers.forEach(el => {
        const name = el.name;
        const color = el.color;
        const scale = el.scale;
        const code = el.code;
        addLayer(name, color, scale, code);
    });

    addParam(jsonData.data.parameters);
}