import { Response, Request } from 'express';
import { Controller, Get, Res, Req, Query, Ip } from '@nestjs/common';
import { MyHttpService } from '~shared/services/http.service';

@Controller('')
export class AppController {
    constructor(private readonly httpService: MyHttpService) {}

    @Get('')
    api(@Res() res: Response, @Req() req: Request, @Ip() ipv4: string) {
        res.json({
            api_name: process.env.APP_NAME,
            version: process.env.APP_API_VERSION,
            enviroment: process.env.NODE_ENV || 'not set , default is local',
            status: 'OK',
            ip: req.ip,
            ips: req.ips,
            ipv4,
        });
    }
}
