import { MigrationInterface, QueryRunner } from "typeorm";

export class CardEntities1758380237637 implements MigrationInterface {
    name = 'CardEntities1758380237637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."trades_status_enum" AS ENUM('open', 'filled', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "trades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tokenId" bigint NOT NULL, "sellerWallet" character varying NOT NULL, "priceWei" numeric(36,0) NOT NULL, "status" "public"."trades_status_enum" NOT NULL DEFAULT 'open', CONSTRAINT "PK_c6d7c36a837411ba5194dc58595" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cards_rarity_enum" AS ENUM('common', 'rare', 'epic', 'legendary')`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "rarity" "public"."cards_rarity_enum" NOT NULL DEFAULT 'common', "imageUrl" character varying NOT NULL, "supply" integer NOT NULL, "pack_id" uuid, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "opens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userWallet" character varying NOT NULL, "openedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "pack_id" uuid, CONSTRAINT "PK_34f18a26e153b97934b6e0e90f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "packs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, "priceWei" numeric(36,0) NOT NULL, "configJson" jsonb NOT NULL, CONSTRAINT "PK_da3c6e998aaa9331767c51e7f91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "minted_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tokenId" bigint NOT NULL, "ownerWallet" character varying NOT NULL, "mintedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "card_id" uuid, CONSTRAINT "PK_088b3f1dc7e42a22988a18255cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_13c5058779e8ae79ca891ffc78a" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opens" ADD CONSTRAINT "FK_59fd8d0b0dcaac0f97604af37b4" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "minted_cards" ADD CONSTRAINT "FK_a9d78d27ecbaec0b23fb43c5d46" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "minted_cards" DROP CONSTRAINT "FK_a9d78d27ecbaec0b23fb43c5d46"`);
        await queryRunner.query(`ALTER TABLE "opens" DROP CONSTRAINT "FK_59fd8d0b0dcaac0f97604af37b4"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_13c5058779e8ae79ca891ffc78a"`);
        await queryRunner.query(`DROP TABLE "minted_cards"`);
        await queryRunner.query(`DROP TABLE "packs"`);
        await queryRunner.query(`DROP TABLE "opens"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TYPE "public"."cards_rarity_enum"`);
        await queryRunner.query(`DROP TABLE "trades"`);
        await queryRunner.query(`DROP TYPE "public"."trades_status_enum"`);
    }

}
