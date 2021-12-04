import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.register({})
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtModule.register({})],
	controllers: [AuthController],
})
export class AuthModule { }
