import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseControllerFactory } from '../../base/base.controller';
import { FiltersDto } from '../../base/dtos/filters.dto';
import { IModule } from '../../shared/services/interfaces/module.interface';
import { ModulesResourceMetadata } from '../metadatas/modules.metadata';
import { ModuleCreateDto, ModuleUpdateDto } from '../dtos/modules.dto';
import { ModulesService } from '../services/modules.service';
import { Get, Res, HttpStatus } from '@nestjs/common';
import { ResponseBody } from '../../base/models/response-body.model';
import { Response } from 'express';

const BaseController = BaseControllerFactory<IModule>({
    isAuth: false,
    metaData: ModulesResourceMetadata,
    cFiltersDto: FiltersDto,
    cCreateDto: ModuleCreateDto,
    cUpdateDto: ModuleUpdateDto,
});

@ApiBearerAuth()
// @UseGuards(AuthGuard)s
export class ModuleController extends BaseController {
    constructor(private readonly modulesService: ModulesService) {
        super(modulesService);
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
            const data = await this.modulesService.getModel().find({ status: 1, deleted: 0 }).select('name status').exec();
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
