import { OnQueueActive, OnQueueCompleted, OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { RequestForgotPasswordsService } from './request-forgot-passwords.service';
import { UsersService } from './users.service';
// import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';

@Processor('sendMail')
export class SendMailProcessor {
    constructor(
        private readonly usersService: UsersService,
        // private readonly mailerService: MailerService,
        private readonly requestForgotPasswordsService: RequestForgotPasswordsService,
    ) {}

    // Product by ...
    // refix by phuongdd3
    @Process()
    async processHandler(job: Job<unknown>) {
        console.log('job.data: ', job.data);
        const data = job.data;

        try {
            console.log('data[type]: ', data['type']);
            if (data['email'] && data['type'] === 'forgot') {
                const title = '[Aditma Bot System] Create New Password';
                const resetPasswordUrl = process.env.APP_PORTAL_URL + '/renew_password?tokenCode=' + data['tokenCode'] + '&email=' + data['email'];
                const toPeople = [job.data['email'], 'doduyphuong433@gmail.com'];
                const fromPeople = process.env.SMTP_DEFAULT_EMAIL;
                const template = 'forgot-password';
                const context = {
                    title: title,
                    resetPasswordUrl: resetPasswordUrl,
                    userName: data['userName'] || '...',
                    fullName: data['fullName'] || 'guy',
                };
                const check = await this.sendMail(toPeople, fromPeople, title, template, context);

                if (data['requestId']) {
                    Logger.log(check, 'SendMailProcessor.sendMail.forgotPassword');
                    await this.requestForgotPasswordsService.update(data['requestId'], {
                        status: 1,
                        description: JSON.stringify(check),
                    });
                }
            } else if (data['email'] && data['type'] === 'created') {
                const title = '[Aditma Bot System] Create Account';
                const validateAccountUrl =
                    process.env.APP_PORTAL_URL + '/validate_account?tokenCode=' + data['requestId'] + '&email=' + data['email'];
                const toPeople = [job.data['email'], 'doduyphuong433@gmail.com'];
                const fromPeople = process.env.SMTP_DEFAULT_EMAIL;
                const template = 'create-account';
                const context = {
                    title: title,
                    validateAccountUrl: validateAccountUrl,
                    userName: data['userName'] || '...',
                    fullName: data['fullName'] || 'guy',
                };
                // const check = await this.sendMail();
                const check = await this.sendMail(toPeople, fromPeople, title, template, context);

                if (data['requestId']) {
                    Logger.log(check, 'SendMailProcessor.sendMail.createAccount');
                    await this.usersService.update(data['requestId'], {
                        status: 0,
                        description: '',
                    });
                }
            }
        } catch (error) {
            if (data['type'] === 'forgot') {
                console.error('Forgot password: ', error);
                await this.requestForgotPasswordsService.update(data['requestId'], {
                    status: 2,
                    description: error.message || error.text,
                });
            } else if (data['type'] === 'created') {
                console.error('Update status valid create account: ', error);
                await this.usersService.update(data['requestId'], {
                    status: 0,
                    description: error.message || error.text,
                });
            }
        }
    }

    // Product by phuongdd3
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async sendMail(toPeople, fromPeople, title, template, context) {
        try {
            // return await this.mailerService.sendMail({
            //     to: toPeople,
            //     from: fromPeople,
            //     subject: title,
            //     template: template,
            //     context: context,
            // });
        } catch (error) {
            console.error('Function sendMail: ', error);
        }
    }

    @OnQueueError()
    async onError(err) {
        console.log(err);
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data, null, 4)}...`);
    }

    @OnQueueCompleted()
    onQueueCompleted(job: Job) {
        console.log(`Completed job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data, null, 4)}...`);
    }

    @OnQueueFailed()
    onQueueFailed(job: Job, err: Error) {
        console.log(err);
        console.log(`Error job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data, null, 4)}...`);
    }
}
