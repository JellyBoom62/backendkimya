import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) { }

	async getAll(): Promise<User[]> {
		return this.usersRepository.find({ select: ['name', 'surname', 'school', 'username', 'class', 'group'] });
	}

	async findByName(name: string): Promise<User[]> {
		try {
			return this.usersRepository.find({ name: name })
		} catch {
			throw new HttpException("This user is not exists", HttpStatus.NOT_FOUND);
		}
	}

	async findByUserName(username: string): Promise<User> {
		try {
			const user = this.usersRepository.findOne({ username: username })
			return user;
		} catch {
			throw new HttpException("This user is not exists", HttpStatus.NOT_FOUND);
		}
	}

	async create(registerDto: RegisterDto) {
		const newUser = this.usersRepository.save(registerDto);
		return newUser;
	}

	async setCurrentRefreshToken(refreshToken: string, userId: number) {
		const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
		await this.usersRepository.update(userId, {
			currentHashedRefreshToken
		});
	}

	async deleteRefreshToken(refreshToken: string) {
		// const user = this.usersRepository.findOne({currentHashedRefreshToken: refreshToken})
		return this.usersRepository.update({ currentHashedRefreshToken: refreshToken }, { currentHashedRefreshToken: null })
	}
}
