/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @,@LastEditTime: ,: 2022-05-05 16:12:08
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 入口文件
 * @FilePath: /edc_pdf_generator/src/main.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { globalService } from './utils/global.service';
import { creatBrowser } from './utils/browser.server';

// # -----------------全局变量配置
globalService.MAX_WSE = 4; //默认设置启动浏览器个数
globalService.ENV = 43369; //默认端口配置(不在打包文件中运行，端口号手动修改)

(async () => {
  console.log('端口', process.env.PORT);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || globalService.ENV);
  new creatBrowser();
})()