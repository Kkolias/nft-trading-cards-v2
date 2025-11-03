import { MigrationInterface, QueryRunner } from "typeorm";

export class CardsDefaultUnboxCount1762193639012 implements MigrationInterface {
    name = 'CardsDefaultUnboxCount1762193639012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "unboxCount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "unboxCount" DROP DEFAULT`);
    }

}
