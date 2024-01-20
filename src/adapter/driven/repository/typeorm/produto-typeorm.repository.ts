import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import Produto from 'src/core/domain/entities/produto'
import IProdutoRepository from 'src/core/domain/repositories/iproduto.repository'
import { IsNull, Repository } from 'typeorm'

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
    await this.repository.save(model)
  }

  async findById (id: string): Promise<Produto | undefined> {
    const produto = await this.repository.findOne({
        where:{
            id
        },
        relations:{
            ingredientes: true,
        }
    })

    return produto ? ProdutoMapper.toDtoForProduto(produto) : undefined
  }

  async save (input: Produto): Promise<void> {
    const {id}=input
    const produto = await this.findById(id)
    if (!produto) {
      throw new Error('Produto não existe')
    }

    await this.repository.save(ProdutoMapper.toProdutoDto(input))

  }

  async find (): Promise<Produto[]> {
    const produtos = await this.repository
    .find({
        where:{
            deletedAt:IsNull()
        },
        relations: {
            ingredientes: true,
        }
    }
    )
    return produtos.map((produto) => {
      return ProdutoMapper.toDtoForProduto(produto)
    })
  }

  async findByCategoria (categoria: ProdutoCategoriaEnum): Promise<Produto[]> {
    const produtos = await this.repository.find({
      where: {
        categoria
      },
      relations: {
            ingredientes: true,
      }
    })

    return produtos.map((produto) => {
      return ProdutoMapper.toDtoForProduto(produto)
    })
  }
}
