
const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=';

function constructVisionApiData(image) {
  return {
    requests: [{
      image: {
        content: image
      }, features: [{
        type: 'LABEL_DETECTION',
        maxResults: 3
      }]
    }]
  };
}

function callVisionApi(data) {
  return fetch(visionApiUrl, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(results => results.json()).then(results => {
    if (
      results &&
      results.responses &&
      results.responses.length &&
      results.responses[0].labelAnnotations
    ) {
      return {
        labels: results.responses[0].labelAnnotations.map(label => label.description)
      };
    }
  });
}

function execute(img, callback) {
      const image = img.split('data:image/jpeg;base64,')[1];
      const data = constructVisionApiData(image);
      callVisionApi(data).then(payload => {
        callback(payload)
      });
}

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.send();
}


function identify(url, callback) {
  console.log('Identify called with: ', url);
  toDataUrl(url, result => {
    // console.log('Base 64 result', result);
    execute(result, callback);
  });
}