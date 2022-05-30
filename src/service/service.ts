/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @,@LastEditTime: ,: 2022-05-30 22:28:40
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: 接口业务逻辑
 * @FilePath: /edc_pdf_generator/src/fileservice/app.service.ts
 */

import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer');
import { Request, Response } from 'express';
import { globalService } from '../utils/global.service';
import { creatBrowser } from '../utils/browser.server';
// const request2 = require('request');

@Injectable()
export class AppService {
  pdfHandler(request: Request, response: Response) {
    console.log('headers', request.headers);
    // console.log('query', request.query);

    console.log('开始处理' + Date.now());

    console.log('主进程id', process.pid);

    // let token = <any>request.headers['pdf-token'] || '';

    let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vRURDLmNvbS8iLCJuaWNrbmFtZSI6IjY0OTMyNjM2MTY2Mzc3ODgxNiIsIm5hbWUiOiI2NDkzMjYzNjE2NjM3Nzg4MTYiLCJjbGllbnRfaWQiOiI2NDkzMjYzNjE2MjE4MzU3NzYiLCJuYmYiOjE2NTM1NTU0OTAsImV4cCI6MTY1MzY0MTg5MCwiaWF0IjoxNjUzNTU1NDkwLCJhdWQiOiJaSEgtMjAyMjA1MjYxNjU4MTA2OTUifQ.B8yDHcZIqmEUhSOb0_83Kq5tJZ9nlYjOCQNNrIot5TE2U1cNsTeSuXnwVpYD7Jdo1N82jHXjl1Mh6kxXCPDWpL7qBA8NDOIfZhbpBtMUEwrgGJTTx5hHlwVdBHVThot0dG2Kz-EfyEAugzIUKCE7zQ37b8tREHmuZQLy8ZBJ4nmNjif2aFERhUg4GaYJ5bAh725DyD8hOvNa8jIOEJIlY6uxqQ9AKhZDqwooCHj5OKy4R7NSytBAVeBipgBV8ASNClBkmhyZl-Wb-RFCjJ59_mHUTzc0a0IKFcDpDta1l_8jqxKBZbK2Kt4b1_1joHo64XPyz61qSLRLzn7siR9OgQ'

    const {
      url,
      study_event_id,
      study_event_oid,
      form_oid,
      form_id,
      form_status_id,
      draftid,
      dbname,
      item_group_repeat_no,
      form_type,
      entry_status,
      role_no,
      is_delete,
      form_repeat_no,
      study_event_repeat_no,
      tempform_id,
      t,
    } = request.query;
    const domain = (<any>request.query.url).split('//')[1].split('/')[0] || '';

    (async () => {
      //从连接池里获取浏览器实例
      let tmp = Math.floor(Math.random() * globalService.MAX_WSE);
      let browserWSEndpoint = globalService.WSE_LIST[tmp];

      //连接浏览器
      const browser = await puppeteer.connect({ browserWSEndpoint });

      //打开tab页
      const page = await browser.newPage();

      //设置页面cookie
      await page.setCookie({
        name: 'PDF-Token',
        value: token,
        domain: domain,
      });

      //最大超时时间
      await page.setDefaultNavigationTimeout(0);

      //导出pdf配置项
      const pdfConfig = {
        format: 'A4', //A4纸
        width: '794px',
        height: '1123px',
        headerTemplate: '', //页头
        footerTemplate: '', //页尾
        margin: {
          top: '60px', //上边距
          bottom: '100px', //下边距
          right: 0,
          left: 0
        },
        scale: 1,
        displayHeaderFooter: false, //是否显示页眉页脚
        printBackground: true //打印背景色
      };

      try {
        const requertUrl =
          url +
          '&study_event_id=' +
          study_event_id +
          '&study_event_oid=' +
          study_event_oid +
          '&form_oid=' +
          form_oid +
          '&form_id=' +
          form_id +
          '&form_status_id=' +
          form_status_id +
          '&draftid=' +
          draftid +
          '&dbname=' +
          dbname +
          '&item_group_repeat_no=' +
          item_group_repeat_no +
          '&form_type=' +
          form_type +
          '&entry_status=' +
          entry_status +
          '&role_no=' +
          role_no +
          '&is_delete=' +
          is_delete +
          '&form_repeat_no=' +
          form_repeat_no +
          '&study_event_repeat_no=' +
          study_event_repeat_no +
          '&tempform_id=' +
          tempform_id +
          '&t=' +
          t;

        try {
          await page.goto(`${requertUrl}`, {
            waitUntil: 'networkidle2'  //考虑在至少500ms内没有超过 2 个网络连接时完成导航
          });

        //   const checkDom = await page.waitFor(
        //     () => !!document.getElementById('#acrf_body'),
        //   );
        //   console.log('查询元素', checkDom._remoteObject.value);

          const pdfBuffer = await page.pdf({
            ...pdfConfig,
          });

          const base64 = pdfBuffer.toString('base64');

          // let requestData = {
          //     'form_status_id': form_status_id,
          //     'pdf': base64
          // }
          // let result_url = '';
          // const urls = [
          //     'https://edc.weilinct.com/edc',
          //     'https://uat-edc.weilinct.com:8088/edc',
          //     'https://test-edc.weilinct.com:8089/edc',
          //     'https://dev-edc.weilinct.com:8089/edc'
          // ]
          // const edc_url = urls.reduce((cur,next) => {
          // 	if(next.includes(domain)) {
          // 		cur.push(next)
          // 	}
          // 	return cur;
          // }, []);
          // result_url = edc_url.length ? edc_url[0] : ('http://localhost:43365')

          // console.log('domain:' +domain, 'result_url:' + result_url);

          // request2({
          //     url: `${result_url}/api/project/data-export/upload-by-form-pdf`,
          //     method: "POST",
          //     json: true,
          //     headers: {
          //         "content-type": "application/json",
          //         'Authorization': 'Bearer ' + token,
          //         'dbname':dbname
          //     },
          //     body: requestData
          // }, function(error, response, body) {
          //   console.log('base64发送结果', body)
          //     // if (!error && response.statusCode == 200) {
          //     //     console.log('base64发送结果', body) // 请求成功的处理逻辑
          //     // }
          // });

          response.set({
            'Content-Type': 'application/pdf'
          })
          response.send(pdfBuffer);

        //   response.json({
        //     pdf: base64,
        //     form_status_id: form_status_id
        //   });

          // await browser.close(); //关闭浏览器

          await page.close(); //关闭tab

          let pageNum = await browser.pages();

          console.log('当前tab页数量:', pageNum.length);

          console.log(
            (page.isClosed()
              ? '执行完毕,关闭tab页面'
              : '执行完毕,未关闭tab页面') + Date.now(),
          );
        } catch (error) {
          await page.close(); //关闭tab

          //关闭浏览器
          for (let i = 0; i < globalService.WSE_LIST.length; i++) {
            let browserWsEndpoint2 = globalService.WSE_LIST[i];

            const browser2 = await puppeteer.connect({ browserWsEndpoint2 });

            await browser2.close();
          }

          new creatBrowser(); // 重启浏览器
        }
      } catch (error) {
        response.status(500);
      }
    })();
  }
}
