import { MigrationInterface, QueryRunner } from "typeorm";

export class MintedCardIndex1758380758272 implements MigrationInterface {
    name = 'MintedCardIndex1758380758272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_771563887fadf9526b9a5ac960" ON "minted_cards" ("ownerWallet") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_771563887fadf9526b9a5ac960"`);
    }

}
