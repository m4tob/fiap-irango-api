import { DeleteResult, ObjectLiteral } from 'typeorm'

export class Relation {
  field: string
  condition?: string
  join?: string
}

export abstract class IGenericRepository<MODEL_TYPE extends ObjectLiteral, ID_TYPE> {
  abstract save (model: MODEL_TYPE): Promise<MODEL_TYPE>

  abstract saveMany (models: MODEL_TYPE[]): Promise<MODEL_TYPE[]>

  abstract findAll (relations?: (Relation |string)[]): Promise<MODEL_TYPE[]>

  abstract findById (id: ID_TYPE, relations?: (Relation |string)[]): Promise<MODEL_TYPE | null>

  abstract findOneBy (values: object, relations?: (Relation |string)[]): Promise<MODEL_TYPE | null>

  abstract findManyBy (values: object, relations?: (Relation |string)[]): Promise<MODEL_TYPE[]>

  abstract findManyById (ids: ID_TYPE[], relations?: (Relation |string)[]): Promise<MODEL_TYPE[]>

  abstract deleteBy (values: object): Promise<DeleteResult>

  abstract delete (id: ID_TYPE): Promise<DeleteResult>

  abstract deleteMany (ids: ID_TYPE[]): Promise<DeleteResult>
}
