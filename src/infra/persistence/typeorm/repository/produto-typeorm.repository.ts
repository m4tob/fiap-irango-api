import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { IsNull, Repository } from 'typeorm'

import Produto from '@/core/domain/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import ProdutoMapper from '@/core/domain/mappers/produto.mapper'
import IProdutoRepository from '@/core/domain/repositories/iproduto.repository'
import { Produto as Entity } from '@/infra/persistence/typeorm/entities/produto'

@Injectable()
export default class ProdutoTypeormRepository implements IProdutoRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Produto): Promise<void> {
    const model = ProdutoMapper.toDto(input)
    await this.repository.save(model)
  }

  async findById (id: string): Promise<Produto | undefined> {
    const produto = await this.repository.findOne({
      where: {
        id,
        deletedAt: IsNull()
      },
      relations: {
        ingredientes: true,
      }
    })

    return produto ? ProdutoMapper.toDomainEntity(produto) : undefined
  }

  async save (input: Produto): Promise<void> {
    const { id } = input
    const produto = await this.findById(id)

    if (!produto) {
      throw new BusinessException('Produto não existe')
    }

    await this.repository.save(ProdutoMapper.toDto(input))
  }

  async find (): Promise<Produto[]> {
    const produtos = await this.repository
      .find({
        where: {
          deletedAt: IsNull()
        },
        relations: {
          ingredientes: true,
        }
      }
      )
    return produtos.map((produto) => {
      return ProdutoMapper.toDomainEntity(produto)
    })
  }

  async findByCategoria (categoria: ProdutoCategoriaEnum): Promise<Produto[]> {
    const produtos = await this.repository.find({
      where: {
        categoria,
        deletedAt: IsNull()
      },
      relations: {
        ingredientes: true,
      }
    })

    return produtos.map((produto) => {
      return ProdutoMapper.toDomainEntity(produto)
    })
  }
}
