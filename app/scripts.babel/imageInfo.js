function renderView(labels, imageUrl) {
  const html = `
    <div class="container">
     <div class="img-container">
      <img src="${imageUrl}" />
     </div>

      <ul>
        <li>${labels[0]}</li>
        <li>${labels[1]}</li>
        <li>${labels[2]}</li>
      </ul>
    </div>
  `;

  document.body.innerHTML = html;
}


document.addEventListener('DOMContentLoaded', function () {
  var imageUrl = window.location.hash.substring(1);
  if (imageUrl) {
    identify(imageUrl, result => {
      if (!result || !result.labels) {
        return;
      }

      console.log('Result!', result.labels);
      renderView(result.labels, imageUrl);
    });
    console.log('The url is ', imageUrl);
  }
});