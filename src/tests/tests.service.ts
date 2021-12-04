import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { TestDto } from './dto/test.dto';
import { Test } from './tests.entity';

@Injectable()
export class TestsService {
	constructor(
		@InjectRepository(Test)
		private testsRepository: Repository<Test>,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	async getTestsName() {
		return this.testsRepository.find({ select: ['testID', 'testName', 'description', 'isCompleted', 'time'] })
	}


	async getTest(id: number) {
		return this.testsRepository.findOne(id)
	}

	async postTest(testDto: TestDto, testID: number) {
		const quiz = this.testsRepository.findOne(testID)
		if ((await quiz) == undefined) {
			return this.testsRepository.save({ testID: testID, ...testDto })
		} else {
			return this.testsRepository.update(testID, testDto)
		}

	}

	async testDelete(id: any) {
		return this.testsRepository.delete(id)
	}

	async changeStatus(testID: number) {
		const quiz = this.testsRepository.findOne(testID)
		return this.testsRepository.update(testID, { isCompleted: !(await quiz).isCompleted })
	}

}

