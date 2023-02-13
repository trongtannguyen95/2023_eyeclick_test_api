import { Controller, Get, HttpStatus, Injectable, Logger, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ShopItemsFilterDto } from '~/modules/shop/dtos/shop-items.dto';
import { ShopItemsResourceMetadata } from '~/modules/shop/metadatas/shop-items.metadata';
import { ShopItemsService } from '~/modules/shop/services/shop-items.service';
import { ResponseBody } from '~base/models/response-body.model';
@Controller('shop')
@ApiTags('frontend - shop resource')
@Injectable()
export class ShopController {
    constructor(private readonly shopItemsService: ShopItemsService) {}
    @Get('get-item-list')
    @ApiOperation({ description: 'get shop item list' })
    @ApiResponse({ status: 200, description: 'get shop item list successfully.' })
    async getToken(
        @Query() filters: ShopItemsFilterDto,
        @Res() res: Response,
        @Req() req: Request,
    ): Promise<Response> {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
        };
        try {
            const data = await this.shopItemsService.listResource(filters, ShopItemsResourceMetadata);
            response.message = 'Ok';

            if (data) {
                response.data = data;
            } else {
                response.data = { list: [], total: 0 };
            }

            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            response.statusCode = 500;
            Logger.error(error.message || error.text, 'Catch.errors');
            response.message = 'Opps! Something went wrong.';
            return res.status(HttpStatus.OK).json(response);
        }
    }
}
