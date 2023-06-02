import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilePath } from 'config/enviroments';
import { ScheduleModule } from '@nestjs/schedule';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SharedModule } from './shared/shared.module';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath()
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    SendGridModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get<string>('SENGRIDAPIKEY'),
      }),
    }),
    DatabaseModule,
    SharedModule,
    UsersModule
  ],
  providers: [],
})
export class AppModule {}
