import { Module } from "@nestjs/common";
import { AnswersController } from "./answers.controller";
import { AnswersService } from "./answers.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from "./answers.entity";



@Module({
	exports: [TypeOrmModule.forFeature([Answer])],
	providers: [AnswersService],
	controllers: [AnswersController],
})

export class AnswersModule { }