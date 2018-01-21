// Hardcoded constants:
const contractAddress = "0x1012b627b910e13739b466be1313afa954b77101";
const otaAddress = "0xbcDda8a84852dC328f90c4E881B3AC30D6a7AC51";
const blockChainNodeUrl = "https://ropsten.infura.io";
const ipfsHost = "ipfs.infura.io";
const ipfsPort = 5001;

// Import libraries we need.
import {
    default as Web3
} from 'web3';
import {
    default as contract
} from 'truffle-contract'
import mnemonicABI from '../contracts/MnemonicVault.json';

var mnemonicContract = web3.eth.contract(mnemonicABI.abi);
var mnemonic = mnemonicContract.at(contractAddress);

const ipfsAPI = require('ipfs-api');
const ethUtil = require('ethereumjs-util');
const ipfs = ipfsAPI({
    host: ipfsHost,
    port: ipfsPort,
    protocol: 'http'
})


window.App = {
    start: function() {
        var self = this;
        $(document).ready(function() {
            getDocuments();
        });
    }
};

function getDocuments() {
    let totalDocuments = 0;

    mnemonic.getTotalDocuments(function(error, result) {
        if (!error){
            totalDocuments = result;
            $('#documentsNumber').text(totalDocuments);
            console.log("documents found in our vault: " + result);
            getDocumentsData(totalDocuments);
        }else{
            console.error(error);
        }
    });

    console.log("Own documents found in blockchain smart contract: " + totalDocuments);
}

function getDocumentsData(totalDocuments){
  for (var i = totalDocuments; i > 0; i--) {
        var documentCode = mnemonic.getDocument(i, function(error, result) {
            if (!error){
                console.log("document found in our vault: " + result);
                var documentName = result[0];
                var time = result[4];
                var formattedTime = getDateFromTimestamp(time);
                console.log("NAME: " + documentName);
                console.log("DATE: " + formattedTime);
                var claims = 
                $(".docsList").append("<li><div><h2>" + documentName + "</h2><p>" + formattedTime + "</p></div><div class='claims'><strong>" + getRandomArbitrary(1,5) + "</strong>claims</div></li>"
                  );
            }else{
                console.error(error);
            }
        });
    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getDateFromTimestamp(timestamp){
      // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp*1000);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime = day + '-0' + month + '-' + year + " " + hour + ":" + minutes;
    return formattedTime;
}

window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("Using blockchain node: " + blockChainNodeUrl);
        window.web3 = new Web3(new Web3.providers.HttpProvider(blockChainNodeUrl));
    }

    App.start();
});