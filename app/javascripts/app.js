import _ from 'lodash';

// Import libraries we need.
import { default as Web3} from 'web3';


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});



window.App = {
  start: function() {
$("#hamburguesa").click(function(event) {
	console.log("hamburguesa click")
  	getDocuments();
});
}
}

function getDocuments(){
	var Web3 = require('web3');
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545/'));
	var myAddress = ('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
	var myHash = '66d02f609dac679a7f0b1424f3412e6a3a14c67eeef2cd102ff2e1e2fa9ed432';
 	var requestedKey = 'Room42'

    console.log("contract retrieving... ");
    console.log("abi: " + mnemonicAbi.abi);
    var mNemonicVaultContract = web3.eth.contract(mnemonicAbi.abi).at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');
    console.log("contract loaded");
    //var result = mNemonicVaultContract.getTotalDocuments();
    var result = mNemonicVaultContract.retrieveDocument.call('0x8cdaf0cd259887258bc13a92c0a6da92698644c0', requestedKey);
    console.log("RESULT: " + result);
	return result;
}

document.body.appendChild(getDocuments());
