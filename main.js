const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const backBtn = document.getElementById('back-btn');
const textInput = document.getElementById('text-input');
const qrcodeContainer = document.getElementById('qrcode');
const qrText = document.getElementById('qr-text');

generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter text or URL!");
    return;
  }

  // Hide input, show result
  document.getElementById("input-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  // Clear previous QR
  qrcodeContainer.innerHTML = '';

  // Generate QR
  new QRCode(qrcodeContainer, {
    text: text,
    width: 390,
    height: 390,
  });

  // Show encoded text below QR
  qrText.innerText = "Data: " + text;
});

downloadBtn.addEventListener('click', () => {
  let img = qrcodeContainer.querySelector('img');
  let canvas = qrcodeContainer.querySelector('canvas');
  let dataUrl;

  if (img && img.src) {
    dataUrl = img.src;
  } else if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  }

  if (dataUrl) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-code.png";
    link.click();
  }
});

// Back button → go back to input
backBtn.addEventListener('click', () => {
  document.getElementById("input-section").style.display = "block";
  document.getElementById("result-section").style.display = "none";
  textInput.value = "";
  qrcodeContainer.innerHTML = "";
  qrText.innerText = "";
});
