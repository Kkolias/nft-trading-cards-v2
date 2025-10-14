// src/blockchain/trading-cards.contract.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { ABI } from './blockchain.const';
// import deployed_addresses from '../../../contracts/ignition/deployments/chain-31337/deployed_addresses.json'

@Injectable()
export class TradingCardsContract implements OnModuleInit {
  private contract: ethers.Contract;

  onModuleInit() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      this.getAbi(),
      wallet
    );
  }

  async initNewPack(packId: number, priceWei: number) {
    const tx = await this.contract.initNewPack(packId, priceWei);
    return tx.wait();
  }

  async setPackPrice(packId: number, priceWei: string) {
    const tx = await this.contract.setPackPrice(packId, priceWei);
    return tx.wait();
  }

  async payPack(packId: number, amountWei: string) {
    const tx = await this.contract.payPack(packId, { value: amountWei });
    return tx.wait();
  }

  private getAbi(): string {
    return ABI
  }

  getInstance() {
    return this.contract;
  }
}