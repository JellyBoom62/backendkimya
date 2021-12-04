import { Controller } from "@nestjs/common";
import { AnswersService } from "./answers.service";



@Controller('answers')
export class AnswersController {
	constructor(
		private answersService: AnswersService
	) { }

	// @UseGuards(JwtAuthGuard)
	// @Post('checkanswers/:testId')
	// async checkQuiz(@Param('testId') testId: number, @Body() answerDto: AnswerDto, @Req() req) {
	// 	const user = this.authService.getUserFromJwt(req.cookies.Authentication);
	// 	const userId = (await user).userId
	// 	return this.testsService.checkQuiz(testId, userId, answerDto)
	// }
}