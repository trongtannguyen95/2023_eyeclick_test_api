import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseControllerFactory } from '~base/base.controller';
import { FiltersDto } from '~base/dtos/filters.dto';
import { IAction } from '~shared/services/interfaces/action.interface';
import { ActionsResourceMetadata } from '../metadatas/actions.metadata';
import { ActionCreateDto } from '../dtos/actions.dto';
import { ActionsService } from '../services/actions.service';
import { Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseBody } from '~base/models/response-body.model';

const BaseController = BaseControllerFactory<IAction>({
    isAuth: true,
    metaData: ActionsResourceMetadata,
    cFiltersDto: FiltersDto,
    cCreateDto: ActionCreateDto,
    cUpdateDto: ActionsService,
});

@ApiBearerAuth()
// @UseGuards(AuthGuard)s
export class ActionController extends BaseController {
    constructor(private readonly actionsService: ActionsService) {
        super(actionsService);
    }

    @Get('/listAll')
    @ApiOperation({ description: `Api list all` })
    @ApiResponse({ status: 200, description: 'Ok' })
    async listAll(@Res() res: Response): Promise<Response> {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
        };
        try {
            const data = await this.actionsService
                .getModel()
                .find({ status: 1, deleted: 0 })
                .select('name resourceId status')
                .populate({
                    path: 'resourceId', // get resource
                    select: 'name status',
                })
                .exec();
            response.message = 'Ok';
            response.data = data;
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            response.statusCode = 500;
            response.message = error.message || error.text;
            return res.status(HttpStatus.OK).json(response);
        }
    }
}
