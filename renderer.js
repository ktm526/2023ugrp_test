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


document.getElementById('n_908').addEventListener('click', function (){
    testIt();
    document.getElementById('n_908').style.display = 'none';
});
document.getElementById('n_901').addEventListener('click', function () {
    //door1
  sendMessage("0");
});
document.getElementById('n_901_cl').addEventListener('click', function () {
    //door2
  sendMessage("1");
});
document.getElementById('toggleLabel').addEventListener('click', function () {
    //rear door
  if(document.getElementById('toggle').checked == false){
    document.getElementById('doorText').innerHTML = '열림';
    sendMessage("2");
  }
  else{
    document.getElementById('doorText').innerHTML = '닫힘';
    sendMessage("3");
  }
});

document.getElementById('n_905').addEventListener('click', function () {
    // reardoor open&close
    if(document.getElementById('toggle').checked == false){
        
            sendMessage("2");
            setTimeout(function () {
              sendMessage("3");
            }, 3000); // 3초 딜레이 후에 sendMessage("3") 호출

     }else{
        console.log('closed')
     }
    
  });
  

