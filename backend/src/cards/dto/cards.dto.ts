import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CardRarity } from 'src/enums/cardRarity.enum';

export class CreateCardPayloadDto {
  @IsString()
  name: string;

  @IsEnum(CardRarity)
  rarity: CardRarity;

  @IsString()
  imageUrl: string;

  @IsUUID()
  packId: string;

  @IsNumber()
  supply: number;
}

export class UpdateCardPayloadDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CardRarity)
  rarity: CardRarity;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsUUID()
  packId: string;

  @IsOptional()
  @IsNumber()
  supply: number;
}
