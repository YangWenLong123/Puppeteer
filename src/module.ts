/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2022-04-29 15:47:11
 * @,@LastEditTime: ,: 2022-05-05 16:31:26
 * @,@LastEditors: ,: your name
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: /EDC.Node/src/module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './controller/file.controller';
import { AppService } from './service/service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
