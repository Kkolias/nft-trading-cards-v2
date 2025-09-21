import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from './cards.service';
import { CreateCardPayloadDto, UpdateCardPayloadDto } from './dto/cards.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../interfaces/user';
import { Card } from 'src/interfaces/card';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardsController {
  constructor(private readonly service: CardsService) {}

  @Post('create')
  async createCard(
    @Body() payload: CreateCardPayloadDto,
    @CurrentUser() user: User,
  ): Promise<Card> {
    return this.service.createCard(payload, user);
  }

  @Post('update')
  async updateCard(
    @Body() payload: UpdateCardPayloadDto,
    @CurrentUser() currentUser: User,
  ): Promise<Card> {
    return this.service.updateCard(payload, currentUser);
  }
}
