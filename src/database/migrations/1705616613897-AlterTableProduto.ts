import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTableProduto1705616613897 implements MigrationInterface {
    name = 'AlterTableProduto1705616613897'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Produto` ADD `imagem_url` varchar(255) NULL')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Produto` DROP COLUMN `imagem_url`')
    }
}
