import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { TestsController } from './tests.controller';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';


@Module({
	imports: [
		UsersModule,
		AuthModule,
		TypeOrmModule.forFeature([Test, User])],
	providers: [TestsService],
	exports: [TestsService, TypeOrmModule.forFeature([Test, User])],
	controllers: [TestsController]
})
export class TestsModule { }
