import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { AdJwtStrategy } from './adjwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		JwtModule.register({})],
	providers: [AdminService, AdJwtStrategy],
	exports: [AdminService, JwtModule.register({})],
	controllers: [AdminController],
})
export class AdminModule { }
