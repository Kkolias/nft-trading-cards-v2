import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";




export class CreatePackDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;

    @IsNumber()
    priceWei: number;

    configJson: Record<string, string | number | boolean>;

    @IsArray()
    @IsUUID('all', { each: true })
    cardIdList: string[];
}

export class UpdatePackDto {
    @IsUUID()
    id: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsNumber()
    priceWei?: number;

    @IsOptional()
    configJson?: Record<string, string | number | boolean>;

    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    cardIdList?: string[];
}