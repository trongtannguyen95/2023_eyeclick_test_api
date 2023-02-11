import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '~base/mbase.service';
import { IUserToken } from '~shared/services/interfaces/user-token.interface';
import { genSha256, parseUserAgent } from '~/helpers/util.helper';
import { UserModel } from '../models/user.model';
import dayjs from 'dayjs';

@Injectable()
export class UserTokensService extends MBaseService<IUserToken> {
    constructor(
        @InjectModel('UserTokens') private readonly userTokensModel: Model<IUserToken>,
        private readonly jwtService: JwtService,
    ) {
        super(userTokensModel);
    }

    /**
     * Backlist a token eq user logout.
     * @param token
     */
    async addToBackList(token: string, tokenInfo: any, user: UserModel) {
        const now = dayjs().unix();
        // Logger.log(tokenInfo.exp);
        // Logger.log(now);
        if (tokenInfo?.exp && tokenInfo.exp > now) {
            const tokenHash = genSha256(token);
            const expRedis = Math.round(tokenInfo.exp - now);
            // Logger.log(expRedis, 'addToBlacklist');
            const checkUpdate = await this.userTokensModel.findOneAndUpdate({ tokenHash: tokenHash }, { status: 2, modified: user.id });
            // Logger.log(checkRedis, 'addToBlacklist.');
            // Logger.log(checkUpdate, 'addToBlacklist..');
            return {
                updateT: !!checkUpdate,
            };
        }
        return false;
    }
    async createLogToken(ip: string, userAgent: string, user: UserModel, token: string) {
        const tokenInfo = this.jwtService.verify(token) as UserModel;
        const now = dayjs().unix();

        if (tokenInfo) {
            const agentInfo = parseUserAgent(userAgent);
            const tokenHash = genSha256(token);
            const check = await this.userTokensModel.create({
                name: user.username + ' login at ' + now,
                description: userAgent,
                status: 0,
                deleted: 0,
                ip: ip,
                agentInfo: agentInfo,
                token: token,
                tokenHash: tokenHash,
                iat: tokenInfo['iat'] || now,
                exp: tokenInfo['exp'] || now,
                created: user.id,
                modified: user.id,
            } as IUserToken);
            return check;
        }
        return false;
    }
}
