import { MigrationInterface, QueryRunner } from "typeorm";

export class CardsEntities1758366410587 implements MigrationInterface {
    name = 'CardsEntities1758366410587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card_series" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_8fda80657b4bfebe50cd2616958" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cards_rarity_enum" AS ENUM('common', 'rare', 'epic', 'legendary')`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "rarity" "public"."cards_rarity_enum" NOT NULL DEFAULT 'common', "imageUrl" character varying NOT NULL, "series_id" uuid, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_6c0d7281894e2f9d513157f885d" FOREIGN KEY ("series_id") REFERENCES "card_series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_6c0d7281894e2f9d513157f885d"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TYPE "public"."cards_rarity_enum"`);
        await queryRunner.query(`DROP TABLE "card_series"`);
    }

}
