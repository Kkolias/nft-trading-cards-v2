import { MigrationInterface, QueryRunner } from "typeorm";

export class OpensUniqueTxHash1762598537658 implements MigrationInterface {
    name = 'OpensUniqueTxHash1762598537658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opens" ADD "txHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "opens" ADD CONSTRAINT "UQ_6a8e7ed009082064ded90f279ed" UNIQUE ("txHash")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opens" DROP CONSTRAINT "UQ_6a8e7ed009082064ded90f279ed"`);
        await queryRunner.query(`ALTER TABLE "opens" DROP COLUMN "txHash"`);
    }

}
