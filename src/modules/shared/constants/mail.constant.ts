

export const SMTP_CONFIG = {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    USERNAME: process.env.SMTP_USERNAME,
    PASSWORD: process.env.SMTP_PASSWORD,
    CHARSET: 'utf-8',
    TLS: !!process.env.SMTP_TLS,
};
