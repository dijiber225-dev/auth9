import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import config from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[(process.env.NODE_ENV as keyof typeof enviroments) ?? 'dev'] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('dev', 'stg', 'prod').default('dev'),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
        CORS_ORIGINS: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
