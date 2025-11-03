import { MigrationInterface, QueryRunner } from "typeorm";

export class MintedCardsAmount1762191870367 implements MigrationInterface {
    name = 'MintedCardsAmount1762191870367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "minted_cards" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "minted_cards" DROP COLUMN "amount"`);
    }

}
