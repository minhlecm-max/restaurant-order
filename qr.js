const qrBox = document.getElementById("qrcode");
const tableInput = document.getElementById("table");

let qr;

function generateQR() {
  qrBox.innerHTML = "";

  const table = tableInput.value || 1;
  const url =
    `http://127.0.0.1:5500/projectcnpm/frontend/customer.html?table=${table}`;

  qr = new QRCode(qrBox, {
    text: url,
    width: 220,
    height: 220,
  });
}

tableInput.addEventListener("input", generateQR);

generateQR();
