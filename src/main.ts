import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
require('dotenv').config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	let corsOptions = {
		origin: "http://89.108.78.3",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 200,
		credentials: true,
	}
	app.enableCors(corsOptions);
	await app.listen(3001);
}
bootstrap();
