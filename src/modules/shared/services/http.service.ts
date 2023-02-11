import { Injectable, Optional } from '@nestjs/common';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import createHttpsProxyAgent from 'https-proxy-agent';


@Injectable()
export class MyHttpService {
    public client: AxiosInstance;

    constructor(@Optional() config: any = {}) {
        this.client = MyHttpService.createClient(config);
    }

    static createClient(config: AxiosRequestConfig = {}) {
        const defaultConfig: AxiosRequestConfig = {};
        if (process.env.PROXY_URL) {
            // defaultConfig.httpAgent = createHttpProxyAgent(process.env.PROXY_URL)
            defaultConfig.httpsAgent = createHttpsProxyAgent(process.env.PROXY_URL);
        }
        return Axios.create({ ...defaultConfig, ...config });
    }
}
