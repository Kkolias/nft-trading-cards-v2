import { MigrationInterface, QueryRunner } from "typeorm";

export class CardsTokenId1762000399604 implements MigrationInterface {
    name = 'CardsTokenId1762000399604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "minted_cards" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "tokenId" BIGSERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "minted_cards" ADD "tokenId" bigint NOT NULL`);
    }

}
