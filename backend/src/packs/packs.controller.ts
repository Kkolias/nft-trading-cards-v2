import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PacksService } from './packs.service';
import { CreatePackDto, UpdatePackDto } from './dto/packs.dto';
import { User } from '../interfaces/user';
import { CurrentUser } from '../auth/current-user.decorator';
import { Pack } from '../interfaces/pack';

@UseGuards(AuthGuard('jwt'))
@Controller('packs')
export class PacksController {
  constructor(private readonly service: PacksService) {}

  @Post('create')
  async createCard(
    @Body() payload: CreatePackDto,
    @CurrentUser() user: User,
  ): Promise<Pack> {
    return this.service.createPack(payload, user);
  }

  @Post('update')
  async updateCard(
    @Body() payload: UpdatePackDto,
    @CurrentUser() currentUser: User,
  ): Promise<Pack> {
    return this.service.updatePack(payload, currentUser);
  }
}
