import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnswersService {
	constructor() { }

	// async checkQuiz(testId: number, userId: number, answerDto: AnswerDto) {
	// 	let percent;
	// 	let trueanswers = new Array()

	// 	const test = this.testsRepository.findOne(testId);

	// 	const answerstests = this.answersRepository.findOne({
	// 		where: [
	// 			{
	// 				testId: testId,
	// 				user: userId
	// 			}
	// 		]
	// 	});

	// 	if ((await answerstests) == undefined) {
	// 		(await test).test.item.map((item, index) => {
	// 			if (item.questionType == 'radio') {
	// 				if (item.answer == answerDto.item[index].answer) {
	// 					trueanswers.push(1)
	// 				} else {
	// 					trueanswers.push(0)
	// 				}
	// 			} else {
	// 				if (JSON.stringify(item.answers) == JSON.stringify(answerDto.item[index].answers)) {
	// 					trueanswers.push(1)
	// 				} else {
	// 					trueanswers.push(0)
	// 				}
	// 			}
	// 		});
	// 		const trueanswerlength = trueanswers.filter(it => it == 1).length
	// 		percent = Math.floor((trueanswerlength / trueanswers.length) * 100)
	// 		const answers = this.answersRepository.create({
	// 			testId: testId,
	// 			trueanswers: trueanswers.toLocaleString(),
	// 			answers: answerDto,
	// 			user: { userId },
	// 		});
	// 		this.answersRepository.save(answers)
	// 	} else {
	// 		(await test).test.item.map((item, index) => {
	// 			if (item.questionType == 'radio') {
	// 				if (item.answer == answerDto.item[index].answer) {
	// 					trueanswers.push(1)
	// 				} else {
	// 					trueanswers.push(0)
	// 				}
	// 			} else {
	// 				if (JSON.stringify(item.answers) == JSON.stringify(answerDto.item[index].answers)) {
	// 					trueanswers.push(1)
	// 				} else {
	// 					trueanswers.push(0)
	// 				}
	// 			}
	// 		});
	// 		const trueanswerlength = trueanswers.filter(it => it == 1).length
	// 		percent = Math.floor((trueanswerlength / trueanswers.length) * 100)
	// 		const answers = this.answersRepository.create({
	// 			testId: testId,
	// 			trueanswers: trueanswers.toLocaleString(),
	// 			answers: answerDto,
	// 			user: { userId },
	// 		});
	// 		this.answersRepository.update((await answerstests).id, answers)
	// 	}

	// 	return answerstests;
	// }
}