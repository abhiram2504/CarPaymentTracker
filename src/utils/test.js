import { ethers } from 'ethers';

const wallet = ethers.Wallet.createRandom();
console.log("New Private Key:", wallet.privateKey);
