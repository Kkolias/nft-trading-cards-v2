import { Controller, Get, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import { Card } from '../interfaces/card';
import { Pack } from '../interfaces/pack';

@Controller('public')
export class PublicController {
  constructor(private readonly service: PublicService) {}

  @Get('all-cards')
  async getAllCards(): Promise<Card[]> {
    return await this.service.getAllCards();
  }

  @Get('card-by-id')
  async getCardById(@Query('id') id: string): Promise<Card | null> {
    return await this.service.getCardById(id);
  }

  @Get('all-packs')
  async getAllPacks(): Promise<Pack[]> {
    return await this.service.getAllPacks();
  }
}
