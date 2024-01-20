import * as fs from 'fs'
import { MigrationInterface, QueryRunner } from 'typeorm'

import { Produto } from '@/adapter/driven/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

interface IngredienteJson {
  nome: string
  preco: number
  imagemUrl: string
}

interface ProdutoJson {
  nome: string
  descricao: string
  preco: number
  categoria: ProdutoCategoriaEnum
  imagemUrl: string
  ingredientes: IngredienteJson[]
}

const FILE_PATH = '../data/1705359271906-produtos.json'

export class InsertProdutosIniciais1705359271906 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const produtos = this.readFile()

    for (const product of produtos) {
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

  private readFile (): ProdutoJson[] {
    const json = fs.readFileSync(FILE_PATH, 'utf8')
    return JSON.parse(json) as ProdutoJson[]
  }
}
