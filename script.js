
const canvas = document.getElementById('my-canvas');
const root = document.querySelector('.root');
const copy = document.querySelector('svg');
const statusImg = document.querySelector('p');
const inputFile = document.getElementById('input-file');
const statusCode = document.querySelector('.codes p');
const putCode = document.getElementById('put-code');
const ctx = canvas.getContext('2d');

const img = new Image();
const reader = new FileReader();

let pixelData, pixelColor, div, imgWidth, imgHeigth;
let ctr1 = ctr2 = 0;

inputFile.addEventListener('change', () => {
  ctr1++;
  reader.addEventListener('load', (e) => {
    ctr2++;
    generateHtmlCSS(ctr1, ctr2, e);
  })
  reader.readAsDataURL(inputFile.files[0]);
})

async function generateHtmlCSS(n1, n2, e) {
  if (n1 === n2) {
    img.src = e.target.result;
    await new Promise(r => setTimeout(r, 0));

    imgWidth = img.width;
    imgHeigth = img.height;
    canvas.width = imgWidth;
    canvas.height = imgHeigth;
    root.style.width = `${imgWidth}px`;
    root.style.height = `${imgHeigth}px`;
    root.textContent = '';
    putCode.textContent = '';

    ctx.drawImage(img, 0, 0);
    statusImg.textContent = 'Processing Image...';
    statusCode.textContent = '';

    for (let i = 1; i <= imgWidth; i++) {
      if (i % 10 === 0) {
        await new Promise(r => setTimeout(r, 0));
      }
      for (let j = 1; j <= imgHeigth; j++) {
        pixelData = ctx.getImageData(i, j, 1, 1).data;
        pixelColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`;

        div = document.createElement('div');
        div.className = 'pixel';
        div.style.top = `${j}px`;
        div.style.left = `${i}px`;
        div.style.backgroundColor = pixelColor;

        root.appendChild(div);
      }
    }
    statusImg.textContent = 'Process Completed';
    statusCode.textContent = 'Processing Code...';
    await new Promise(r => setTimeout(r, 0));
    putCode.textContent = root.innerHTML;
    statusCode.textContent = 'Processing Code Completed';
    copy.addEventListener('click', () => {
      putCode.select();
      navigator.clipboard.writeText(putCode.value);
    })
  }
}

