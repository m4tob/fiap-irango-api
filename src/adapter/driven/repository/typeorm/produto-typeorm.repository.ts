import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import Produto from 'src/core/domain/entities/produto'
import IProdutoRepository from 'src/core/domain/repositories/iproduto.repository'
import { Repository } from 'typeorm'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import ProdutoMapper from '@/core/domain/mappers/produto.mapper'

import { Produto as Entity } from '../../entities/produto'

@Injectable()
export default class ProdutoTypeormRepository implements IProdutoRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Produto): Promise<void> {
    const model = ProdutoMapper.toProdutoDto(input)
    await this.repository.insert(model)
  }

  async findById (id: string): Promise<Produto | undefined> {
    const produto = await this.repository.findOneBy({
      id
    })

    return produto ? ProdutoMapper.toDtoForProduto(produto) : undefined
  }

  async save (input: Produto): Promise<void> {
    const produto = await this.findById(input.id)

    if (!produto) {
      throw new Error('Produto não existe')
    }

    await this.repository.update(input.id, ProdutoMapper.toProdutoDto(input))
  }

  async find (): Promise<Produto[]> {
    return []
  }

  async findByCategoria (categoria: ProdutoCategoriaEnum): Promise<Produto[]> {
    const produtos = await this.repository.find({
      where: {
        categoriaId: categoria
      }
    })

    return produtos.map((produto) => {
      return ProdutoMapper.toDtoForProduto(produto)
    })
  }
}
