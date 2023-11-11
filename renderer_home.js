document.getElementById('Icon_feather-menu').addEventListener('click', function(){
    window.location.href = 'menu.html';
})

document.getElementById('n_823').addEventListener('click', function () {
    //process
    console.log('launch process');
    const {launchProcess} = require('electron').remote.require('./index.js');
  });