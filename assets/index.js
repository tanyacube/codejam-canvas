var canvasSize = 512;

var canvas = document.getElementById("canvas");

if (canvas.getContext) {
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('click', function (event) {

  if (!event.target.matches('.redraw')) return;

  event.preventDefault();

  var size = event.target.getAttribute('data-size');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (size) {
    case '4':
      drawFromArray(imgData4x4, 'hex');
      break;
    case '32':
      drawFromArray(imgData32x32, 'rgba');
      break;
    case '256':
        var img = new Image;
        img.onload = function(){
          ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
        };
        img.src = "./assets/images/image.png";
      break;
  }
}, false);

function drawFromArray(arr, colorType) {
  var width = canvasSize / arr.length;

  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (colorType === 'hex') {
        ctx.fillStyle = '#' + arr[i][j];
      } else if (colorType === 'rgba') {
        var cell = arr[i][j]
        ctx.fillStyle = 'rgba(' + cell[0] + ', ' + cell[1] + ', ' + cell[2] + ',' + cell[3] + ')'; 
      }
      ctx.fillRect(width * i, width * j, width, width);
    }
  }
}