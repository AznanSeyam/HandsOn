import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '../config/database.config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule],
})
export class AppModule {}
