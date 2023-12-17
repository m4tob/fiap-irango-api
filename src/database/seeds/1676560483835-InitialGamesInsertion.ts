/* import { INestApplicationContext } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { MigrationInterface, QueryRunner } from 'typeorm'
import { initializeTransactionalContext, IsolationLevel, Transactional } from 'typeorm-transactional'

import { AppModule } from '@/AppModule'
import { CsvHelper } from '@/core/helpers/CsvHelper'
import { FeedSource } from '@/feed/structures/enums/FeedSource'
import { TweetsIndexationType } from '@/feed/structures/enums/TweetsIndexationType'
import { DevicePlatformEnum } from '@/game/structures/enums/DevicePlatformEnum'
import { GameStoreResponse } from '@/game/structures/responses/GameStoreResponse'
import { CreateGameCategoryUseCase } from '@/game/usecases/CreateGameCategoryUseCase'
import { CreateGameUseCase } from '@/game/usecases/CreateGameUseCase'
import { FindGameFromStoreUseCase } from '@/game/usecases/FindGameFromStoreUseCase/FindGameFromStoreUseCase'

const INPUT_FILE_PATH = './src/database/seeds/data/1676560483835-games.csv'

export class InitialGamesInsertion1676560483835 implements MigrationInterface {
  nestApp: INestApplicationContext
  createGameUseCase: CreateGameUseCase
  findGameFromStoreUseCase: FindGameFromStoreUseCase
  createGameCategoryUseCase: CreateGameCategoryUseCase

  categoriesMap: Record<string, number> = {}

  csv: { title: string; android: string; ios: string; twitter: string }[]

  @Transactional({ isolationLevel: IsolationLevel.READ_COMMITTED })
  private async processCsv (): Promise<void> {
    for (const record of this.csv) {
      console.log(`Processing game '${record.title}' android: '${record.android}' ios: '${record.ios}' twitter: '${record.twitter}'`)

      const gameAndroid = record.android
        ? await this.findGameFromStoreUseCase.execute(DevicePlatformEnum.ANDROID, record.android)
        : undefined
      const gameIos = record.ios
        ? await this.findGameFromStoreUseCase.execute(DevicePlatformEnum.IOS, record.ios)
        : undefined
      const gameResposne: GameStoreResponse | undefined = gameAndroid || gameIos

      if (!gameResposne) throw new Error(`Game '${record.title}' not found in stores`)
      if (record.android && !gameAndroid) throw new Error(`Game '${record.title}' not found in android store`)
      if (record.ios && !gameIos) throw new Error(`Game '${record.title}' not found in iOS store`)

      const categories = gameAndroid?.categories?.length ? gameAndroid.categories : gameIos?.categories || []
      const categoriesToCreate = categories.filter((category) => !this.categoriesMap[category])
      for (const name of categoriesToCreate) {
        const category = await this.createGameCategoryUseCase.execute({ name_pt_br: name, name_en_us: name, name_es_es: name })
        this.categoriesMap[category.name] = category.id
      }

      const feedSettings = record.twitter
        ? [
          {
            source: FeedSource.TWITTER,
            metadata: { username: record.twitter, indexationType: TweetsIndexationType.ALL },
          },
        ]
        : []

      await this.createGameUseCase.execute({
        title_pt_br: gameResposne.title,
        title_en_us: gameResposne.title,
        title_es_es: gameResposne.title,
        imageUrl: gameResposne.imageUrl,
        backgroundUrl: gameResposne.backgroundUrl,
        description_pt_br: gameResposne.description,
        description_en_us: gameResposne.description,
        description_es_es: gameResposne.description,
        publisher: gameResposne.publisher,
        categoriesIds: new Array(...new Set(categories.map((category) => this.categoriesMap[category]))),
        android: gameAndroid,
        ios: gameIos,
        feedSettings,
      })
    }
  }

  private async readCsv (): Promise<void> {
    this.csv = CsvHelper.parseSync(INPUT_FILE_PATH)
  }

  private async initNest (): Promise<void> {
    initializeTransactionalContext()
    this.nestApp = await NestFactory.createApplicationContext(AppModule)
    this.createGameUseCase = this.nestApp.get(CreateGameUseCase, { strict: false })
    this.findGameFromStoreUseCase = this.nestApp.get(FindGameFromStoreUseCase, { strict: false })
    this.createGameCategoryUseCase = this.nestApp.get(CreateGameCategoryUseCase, { strict: false })
  }

  private async close (): Promise<void> {
    await this.nestApp?.close()
  }

  public async up (): Promise<void> {
    try {
      await this.readCsv()
      await this.initNest()
      await this.processCsv()
    } finally {
      await this.close()
    }
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await this.readCsv()
    const titles: string[] = []
    const androidIds: string[] = []
    const iosIds: string[] = []

    for (const record of this.csv) {
      titles.push(`'${record.title}'`)
      if (record.android) androidIds.push(`'${record.android}'`)
      if (record.ios) iosIds.push(`'${record.ios}'`)
    }

    const gamePublishersIds = await queryRunner.query(`SELECT GamePublisher.id FROM GamePublisher INNER JOIN Game ON Game.publisherId = GamePublisher.id WHERE Game.title_pt_br IN (${titles.join(',')})`)
    const gameCategoriesIds = await queryRunner.query(`SELECT GameCategory.id FROM GameCategory INNER JOIN Game_x_GameCategory ON Game_x_GameCategory.gameCategoryId = GameCategory.id INNER JOIN Game ON Game.id = Game_x_GameCategory.gameId WHERE Game.title_pt_br IN (${titles.join(',')})`)

    await queryRunner.query(`DELETE FROM Game WHERE title_pt_br IN (${titles.join(',')})`)
    await queryRunner.query(`DELETE FROM GameAndroid WHERE idStore IN (${androidIds.join(',')})`)
    await queryRunner.query(`DELETE FROM GameIos WHERE idStore IN (${iosIds.join(',')})`)

    if (gamePublishersIds.length) {
      await queryRunner.query(`DELETE FROM GamePublisher WHERE NOT EXISTS (SELECT Game.id FROM Game WHERE Game.publisherId = GamePublisher.id) AND GamePublisher.id IN (${gamePublishersIds.map(({ id }) => `${id}`).join(',')})`)
    }

    if (gameCategoriesIds.length) {
      await queryRunner.query(`DELETE FROM GameCategory WHERE NOT EXISTS (SELECT Game_x_GameCategory.gameId FROM Game_x_GameCategory WHERE Game_x_GameCategory.gameCategoryId = GameCategory.id) AND GameCategory.id IN (${gameCategoriesIds.map(({ id }) => `${id}`).join(',')})`)
    }
  }
}
 */
