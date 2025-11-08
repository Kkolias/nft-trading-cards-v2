import { IsString, IsUUID } from "class-validator";



export class UnboxPackDto {
    @IsUUID()
    packId: string;

    @IsString()
    userAddress: string;

    @IsString()
    txHash: string;
}