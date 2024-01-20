import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableIngredite1705617637178 implements MigrationInterface {
    name = 'AddTableIngredite1705617637178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Ingrediente\` (\`id\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, \`preco\` float NULL, \`imagem_url\` varchar(255) NULL, \`produtoId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Ingrediente\` ADD CONSTRAINT \`FK_6fa9d7a981ec745ac9103b79224\` FOREIGN KEY (\`produtoId\`) REFERENCES \`Produto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Ingrediente\` DROP FOREIGN KEY \`FK_6fa9d7a981ec745ac9103b79224\``);
        await queryRunner.query(`DROP TABLE \`Ingrediente\``);
    }

}
