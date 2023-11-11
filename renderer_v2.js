let test = 1;
let port; // 전역 변수로 port 선언

const filters = [
  { usbVendorId: 9025, usbProductId: 32858 },
  { usbVendorId: 9025, usbProductId: 90}
];

async function testIt() {
  try {
    port = await navigator.serial.requestPort({ filters });
    const portInfo = port.getInfo();
    await port.open({ baudRate: 115200 });
    console.log(portInfo.usbVendorId);
  } catch (ex) {
    if (ex.name === 'NotFoundError') {
      console.log("device not found");
    } else {
      console.log(ex);
    }
  }
}

async function sendMessage(message) {
  console.log(message);
  const portInfo = port.getInfo();
  const writer = port.writable.getWriter();
  let data = new Uint8Array([message.charCodeAt(0)]);
//   if (test == 1) {
//     data = new Uint8Array([48]);
//   } else {
//     data = new Uint8Array([49]);
//   }
  await writer.write(data);
  writer.releaseLock();
}
document.getElementById('home').addEventListener('click', function (){
  window.location.href = 'home.html';
});

document.getElementById('n_908').addEventListener('click', function (){
    testIt();
    document.getElementById('n_908').style.display = 'none';
});
document.getElementById('n_901').addEventListener('click', function () {
    //door1
  sendMessage("0");
});
document.getElementById('n_901_dc').addEventListener('click', function () {
    //door2
  sendMessage("1");
});
document.getElementById('n_932').addEventListener('click', function () {
  //rear open
sendMessage("2");
});
document.getElementById('n_933').addEventListener('click', function () {
  //rear open
sendMessage("3");
});
document.getElementById('n_926').addEventListener('click', function () {
  //rear open
  console.log('launch process');
  const {launchProcess} = require('electron').remote.require('./index.js');
});

  

