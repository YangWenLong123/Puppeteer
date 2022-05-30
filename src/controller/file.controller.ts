/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @,@LastEditTime: ,: 2022-04-28 17:52:54
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 控制器，路由
 * @FilePath:/edc_pdf_generator/src/filecontroller/app.controller.ts
 */

import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from '../service/service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getPdf')
  pdfHandler(@Req() request: Request, @Res() response: Response) {
    return this.appService.pdfHandler(request, response);
  }
}
