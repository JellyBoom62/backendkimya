import { Body, Controller, Get, Post, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AdJwtAuthGuard } from 'src/admin/adjwt.guard';
import { TestDto } from './dto/test.dto';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
	constructor(
		private testsService: TestsService,
	) { }

	@Get('name')
	async getTestsName() {
		return this.testsService.getTestsName()
	}

	@Get(':id')
	async getTest(@Param('id') id: number) {
		const quiz = this.testsService.getTest(id)
		if (await quiz == undefined) {
			throw new HttpException('Belə bir test yoxdur', HttpStatus.NOT_FOUND)
		} else {
			return quiz
		}
	}

	@UseGuards(AdJwtAuthGuard)
	@Get('status/:testID')
	async changeStatus(@Param('testID') testID: number) {
		return this.testsService.changeStatus(testID)
	}

	@UseGuards(AdJwtAuthGuard)
	@Post(':testID')
	async postTest(@Body() testDto: TestDto, @Param('testID') testID: number) {
		return this.testsService.postTest(testDto, testID);
	}

	@UseGuards(AdJwtAuthGuard)
	@Post('delete/:id')
	async testDelete(@Param('id') id: any) {
		return this.testsService.testDelete(id)
	}
}
