import { ethers } from 'ethers';

const key = '4bfaedb125be0ceebbbc5ddcd0aa571bca9f70e5f9741125d42e35d5b290c965';
try {
  const wallet = new ethers.Wallet(key);
  console.log('Valid key! Address:', wallet.address);
} catch (error) {
  console.error('Invalid key:', error.message);
}
