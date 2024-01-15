import { MigrationInterface, QueryRunner } from 'typeorm'

import { Produto } from '@/adapter/driven/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export class InsertProdutosIniciais1705359271906 implements MigrationInterface {
    produtos = [
      {
        nome: 'Big Mac',
        descricao: 'Hamburguer do McDonalds',
        preco: 20.0,
        categoria: ProdutoCategoriaEnum.LANCHE,
        imagemUrl: 'https://www.mcdonalds.com.br/uploads/2020/10/16/Big-Mac.png',
        ingredientes: [
          'Pão com gergelim',
          'Dois hambúrgueres de carne bovina',
          'Molho especial',
          'Alface americana',
          'Queijo cheddar',
          'Pepino em conserva',
          'Cebola',
        ],
      },
      {
        nome: 'Coca-Cola',
        descricao: 'Refrigerante de cola',
        preco: 5.0,
        categoria: ProdutoCategoriaEnum.BEBIDA,
        imagemUrl: 'https://www.cocacola.com.br/content/dam/GO/CokeZone/Common/ShareACoke/ShareACoke_600x315.jpg',
        ingredientes: [
          // Só colocar o que for personalizável
        ],
      },
    ]

    public async up (queryRunner: QueryRunner): Promise<void> {
      for (const product of this.produtos) {
        const { ingredientes, ...params } = product
        let entity = new Produto(params)
        entity = await queryRunner.manager.save(entity)

        for (const ingrediente of ingredientes) {
          await queryRunner.query(
            `INSERT INTO ProdutoIngrediente (produto_id, nome) VALUES (${entity.id}, '${ingrediente}');`
          )
        }
      }
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELETE FROM ProdutoIngrediente;')
      await queryRunner.query('DELETE FROM Produto;')
    }
}
