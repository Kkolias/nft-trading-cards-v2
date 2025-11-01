import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import contractConfig from '../../contract-config.json';

@Injectable()
export class TradingCardsContract implements OnModuleInit {
  private contract: ethers.Contract;

  async onModuleInit() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const abi = this.getAbi();

    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      abi,
      wallet,
    );

    console.log('Contract owner:', await this.contract.owner());
    console.log("wallet", await wallet.getAddress());
  }

  async initNewPack(packId: number, priceWei: string | number | bigint) {
    console.log('Kutsutaan', packId, priceWei);
    const tx = await this.contract.initNewPack(packId, priceWei.toString());
    return tx.wait();
  }

  async setPackPrice(packId: number, priceWei: string | number | bigint) {
    const tx = await this.contract.setPackPrice(packId, priceWei.toString());
    return tx.wait();
  }

  async mintCardToUser(
    cardTokenId: number,
    userAddress: string,
    amount: number = 1,
  ): Promise<ethers.TransactionReceipt> {
    const tx = await this.contract.mintCardToUser(
      userAddress,
      cardTokenId,
      amount,
    );
    return tx.wait;
  }

  async createNewCard(tokenId: number): Promise<ethers.TransactionReceipt> {
    const tx = await this.contract.createNewCard(tokenId);
    return tx.wait();
  }

  async payPack(packId: number, amountWei: string) {
    const tx = await this.contract.payPack(packId, { value: amountWei });
    return tx.wait();
  }

  private getAbi() {
    return contractConfig?.contractABI;
  }

  getInstance() {
    return this.contract;
  }
}
