import { Get, HttpStatus, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseControllerFactory } from '../../base/base.controller';
import { FiltersDto } from '../../base/dtos/filters.dto';
import { ResponseBody } from '../../base/models/response-body.model';
import { IResource } from '../../shared/services/interfaces/resource.interface';
import { ResourceCreateDto, ResourceUpdateDto } from '../dtos/resources.dto';
import { ResourcesResourceMetadata } from '../metadatas/resources.metadata';
import { ResourcesService } from '../services/resources.service';

const BaseController = BaseControllerFactory<IResource>({
    isAuth: false,
    metaData: ResourcesResourceMetadata,
    cFiltersDto: FiltersDto,
    cCreateDto: ResourceCreateDto,
    cUpdateDto: ResourceUpdateDto,
});

@ApiBearerAuth()
// @UseGuards(AuthGuard)s
export class ResourceController extends BaseController {
    constructor(private readonly resourcesService: ResourcesService) {
        super(resourcesService);
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
            const data = await this.resourcesService
                .getModel()
                .find({ status: 1, deleted: 0 })
                .select('name moduleId status')
                .populate({
                    path: 'moduleId', // get resource
                    select: 'name status deleted',
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
