import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1677129734816 implements MigrationInterface {
    name = 'CreateUserTable1677129734816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "username" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "profileImage" character varying(250), "avatarImage" character varying(250), "websiteUrl" character varying(250), "location" character varying(1000), "bioDescription" character varying(1000), "skills" character varying(1000), "languages" character varying(1000), "learningInfo" character varying(1000), "education" character varying(1000), "work" character varying(1000), "job" character varying(1000), "availableFor" character varying(1000), "refreshToken" character varying(250), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
