import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    {
      provide: 'UsersRepository',
      useFactory: (dataSource: DataSource) => {
        return new UsersRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
