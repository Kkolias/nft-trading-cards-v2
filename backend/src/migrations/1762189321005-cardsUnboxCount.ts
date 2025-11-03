import { MigrationInterface, QueryRunner } from "typeorm";

export class CardsUnboxCount1762189321005 implements MigrationInterface {
    name = 'CardsUnboxCount1762189321005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD "unboxCount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "unboxCount"`);
    }

}
