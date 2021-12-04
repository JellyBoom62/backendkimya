import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { TestsModule } from './tests/tests.module';
import { AdminModule } from './admin/admin.module';
import { Test } from './tests/tests.entity';
import { Answer } from './answers/answers.entity';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		TestsModule,
		AdminModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'almazkimya',
			entities: [User, Test, Answer],
			synchronize: true,
		})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
