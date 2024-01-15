import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTablePedido1705254795546 implements MigrationInterface {
    name = 'CreateTablePedido1705254795546'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `Pedido` (`id` varchar(255) NOT NULL, `nome` varchar(255) NOT NULL, `descricao` varchar(255) NOT NULL, `preco` float NOT NULL, `status` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `Pedido`')
    }
}
