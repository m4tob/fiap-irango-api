import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTablePedido1705457218319 implements MigrationInterface {
    name = 'CreateTablePedido1705457218319'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        'CREATE TABLE `Pedido` (' +
        '  `id` int NOT NULL AUTO_INCREMENT, ' +
        '  `consumidor_id` varchar(36) NULL, ' +
        '  `total` float NOT NULL, ' +
        '  `status` varchar(20) NOT NULL, ' +
        '  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
        '  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), ' +

        '  PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB'
      )
      await queryRunner.query(
        'CREATE TABLE `ItemPedido` (' +
        '  `id` varchar(36) NOT NULL, ' +
        '  `pedido_id` int NOT NULL, ' +
        '  `produto_id` varchar(36) NOT NULL, ' +
        '  `preco` float NOT NULL, ' +

        '  PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB'
      )
      await queryRunner.query(
        'CREATE TABLE `ItemPedidoIngrediente` (' +
        '  `itemPedidoId` varchar(36) NOT NULL, ' +
        '  `ingredienteId` varchar(36) NOT NULL, ' +

        '  INDEX `IDX_20fdb42bd9137b2a7819d0918d` (`itemPedidoId`), ' +
        '  INDEX `IDX_7712989acde4d0129bd27a4bb7` (`ingredienteId`), ' +
        '  PRIMARY KEY (`itemPedidoId`, `ingredienteId`)' +
        ') ENGINE=InnoDB'
      )
      await queryRunner.query('ALTER TABLE `Pedido` ADD CONSTRAINT `FK_7c6d2423ee562c77254361ac756` FOREIGN KEY (`consumidor_id`) REFERENCES `Consumidor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE')
      await queryRunner.query('ALTER TABLE `ItemPedido` ADD CONSTRAINT `FK_355616aab641874d52a5a1d9447` FOREIGN KEY (`pedido_id`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE')
      await queryRunner.query('ALTER TABLE `ItemPedido` ADD CONSTRAINT `FK_253d048ad87d3579a5cd7935f4a` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE')
      await queryRunner.query('ALTER TABLE `ItemPedidoIngrediente` ADD CONSTRAINT `FK_20fdb42bd9137b2a7819d0918d7` FOREIGN KEY (`itemPedidoId`) REFERENCES `ItemPedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE')
      await queryRunner.query('ALTER TABLE `ItemPedidoIngrediente` ADD CONSTRAINT `FK_7712989acde4d0129bd27a4bb70` FOREIGN KEY (`ingredienteId`) REFERENCES `Ingrediente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `ItemPedidoIngrediente` DROP FOREIGN KEY `FK_7712989acde4d0129bd27a4bb70`')
      await queryRunner.query('ALTER TABLE `ItemPedidoIngrediente` DROP FOREIGN KEY `FK_20fdb42bd9137b2a7819d0918d7`')
      await queryRunner.query('ALTER TABLE `ItemPedido` DROP FOREIGN KEY `FK_253d048ad87d3579a5cd7935f4a`')
      await queryRunner.query('ALTER TABLE `ItemPedido` DROP FOREIGN KEY `FK_355616aab641874d52a5a1d9447`')
      await queryRunner.query('ALTER TABLE `Pedido` DROP FOREIGN KEY `FK_7c6d2423ee562c77254361ac756`')
      await queryRunner.query('DROP INDEX `IDX_7712989acde4d0129bd27a4bb7` ON `ItemPedidoIngrediente`')
      await queryRunner.query('DROP INDEX `IDX_20fdb42bd9137b2a7819d0918d` ON `ItemPedidoIngrediente`')

      await queryRunner.query('DROP TABLE `ItemPedidoIngrediente`')
      await queryRunner.query('DROP TABLE `ItemPedido`')
      await queryRunner.query('DROP TABLE `Pedido`')
    }
}
