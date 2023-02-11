import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseControllerFactory } from '../../base/base.controller';
import { IAcl } from '../../shared/services/interfaces/acl.interface';
import { AclsService } from '../services/acls.service';
import { AclCreateDto, AclUpdateDto, AclFilterDto } from '../dtos/acl.dto';
import { RolesResourceMetadata } from '../metadatas/role.metadata';

const BaseController = BaseControllerFactory<IAcl>({
    isAuth: true,
    metaData: RolesResourceMetadata,
    cFiltersDto: AclFilterDto,
    cCreateDto: AclCreateDto,
    cUpdateDto: AclUpdateDto,
});

@ApiBearerAuth()
// @UseGuards(AuthGuard)
export class AclsController extends BaseController {
    constructor(private readonly aclService: AclsService) {
        super(aclService);
    }
}
