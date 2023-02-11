import crypto from 'crypto';


const DEFAULT_ALGORITHM = 'aes-256-ctr';
const DEFAULT_SECRET_KEY = process.env.APP_SECRET;
const iv = Buffer.from('0000000000000000', 'hex'); // not random salt

export function encrypt(text: string, customKey?: string, customAlgorithm?: string) {
    const algorithm = customAlgorithm ? customAlgorithm : DEFAULT_ALGORITHM;
    const secretKey = customKey ? customKey : DEFAULT_SECRET_KEY;
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex');
}

export function decrypt(hash: string, customKey?: string, customAlgorithm?: string) {
    const algorithm = customAlgorithm ? customAlgorithm : DEFAULT_ALGORITHM;
    const secretKey = customKey ? customKey : DEFAULT_SECRET_KEY;
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

    return decrpyted.toString();
}
