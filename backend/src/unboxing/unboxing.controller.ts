import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnboxingService } from './unboxing.service';
import { CardPick } from '../algorithms/v1/unboxCardRandomizer';
import { UnboxPackDto } from './dto/unboxing.dto';
import { MintedCard } from '../interfaces/minted-cards';
// import { CurrentUser } from "src/auth/current-user.decorator";
// import { User } from "src/interfaces/user";

@UseGuards(AuthGuard('jwt'))
@Controller('unboxing')
export class UnboxingController {
  constructor(private readonly service: UnboxingService) {}

  @Post('unbox-pack')
  async createCard(
    @Body() { packId, userAddress, txHash }: UnboxPackDto,
    // @CurrentUser() user: User,
  ): Promise<CardPick[]> {
    return this.service.unboxPack(packId, userAddress, txHash);
  }

  @Get("unboxed-cards")
  async getUnboxedCards(
    @Query() { address }: { address: string },
  ): Promise<MintedCard[]> {
    return this.service.getAddressUnboxedCards(address);
  }
}
