import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnDeleteAtTableProduto1705264099339 implements MigrationInterface {
    name = 'AddColumnDeleteAtTableProduto1705264099339'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('Produto', new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
        default: null,
      }))
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('Produto', 'deleted_at')
    }
}
