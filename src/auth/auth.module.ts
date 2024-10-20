import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'topSecret51', signOptions: { expiresIn: 3600 } }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    AuthService,
    {
      provide: 'UsersRepository',
      useFactory: (dataSource: DataSource) => {
        return new UsersRepository(dataSource);
      },
      inject: [DataSource],
    },
    JwtStrategy
  ],
  controllers: [AuthController],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule { }
