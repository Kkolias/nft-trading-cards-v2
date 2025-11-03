import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import contractConfig from '../../contract-config.json';

@Injectable()
export class TradingCardsContract implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private abi: any;
  private contractAddress: string;

  async onModuleInit() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    this.contractAddress = this.getContractAddress();
    this.abi = this.getAbi();

    const contract = this.getContractWithSigner();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
    console.log('Contract owner:', await contract.owner());
    console.log('wallet', await wallet.getAddress());
  }

  async initNewPack(packId: number, priceWei: string | number | bigint) {
    console.log('Kutsutaan', packId, priceWei);
    const contract = this.getContractWithSigner();
    const tx = await contract.initNewPack(packId, priceWei.toString());
    return tx.wait();
  }

  async setPackPrice(packId: number, priceWei: string | number | bigint) {
    const contract = this.getContractWithSigner();
    const tx = await contract.setPackPrice(packId, priceWei.toString());
    return tx.wait();
  }

  async mintCardToUser(
    cardTokenId: number,
    userAddress: string,
    amount: number = 1,
  ): Promise<ethers.TransactionReceipt> {
    const contract = this.getContractWithSigner();
    const tx = await contract.mintCard(
      userAddress,
      cardTokenId,
      amount,
    );
    return tx.wait();
  }

  async createNewCard(tokenId: number): Promise<ethers.TransactionReceipt> {
    const contract = this.getContractWithSigner();
    const tx = await contract.createNewCard(tokenId);
    return tx.wait();
  }

  async payPack(packId: number, amountWei: string) {
    const contract = this.getContractWithSigner();
    const tx = await contract.payPack(packId, { value: amountWei });
    return tx.wait();
  }

  private getAbi() {
    return contractConfig?.contractABI;
  }

  private getContractAddress() {
    // const address = process.env.CONTRACT_ADDRESS;
    return contractConfig?.contractAddress;
  }

  private getContractWithSigner() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
    return new ethers.Contract(
      this.contractAddress,
      this.abi,
      wallet,
    );
  }
}
