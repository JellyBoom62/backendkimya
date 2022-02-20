import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService
	) { }

	async validateUser(userData: LoginDto) {
		try {
			const user = this.usersService.findByUserName(userData.username);
			await this.verifyPassword(userData.password, (await user).password);
			(await user).password = undefined
			return user;
		} catch (error) {
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}

	async register(RegisterDto: RegisterDto) {
		const hashedPassword = await bcrypt.hash(RegisterDto.password, 10)
		try {
			const user = await this.usersService.create({
				...RegisterDto,
				password: hashedPassword
			});
			user.password = undefined;
			return user;
		} catch (error) {
			throw new HttpException('This username already exist or something went wrong', HttpStatus.BAD_REQUEST);
		}
	}

	public async verifyPassword(textPassword: string, hashedPassword: string) {
		const isPassword = await bcrypt.compare(textPassword, hashedPassword);
		if (!isPassword) {
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}



	public async getUserFromJwt(token: string) {
		try {
			const payload = this.jwtService.verify(token, { secret: `${process.env.SECRET_KEY}` })
			if (payload.username) {
				const user = this.usersService.findByUserName(payload.username);
				return user;
			}
		} catch {
			throw new HttpException('Wrong token', HttpStatus.NOT_FOUND);
		}
	}

	public async isTokenSuccess(token: string): Promise<boolean | Boolean> {
		try {
			const payload = this.jwtService.verify(token, { secret: `${process.env.SECRET_KEY}` })
			const user = this.usersService.findByUserName(payload.username);
			return true;
		} catch {
			return false;
		}
	}

	public async isAdTokenSuccess(token: string) {
		try {
			const payload = this.jwtService.verify(token, { secret: `${process.env.REFRESH_SECRET_KEY}` })
			if (payload.username = 'almaz') {
				return true;
			} else {
				return false
			}
		} catch {
			return false;
		}
	}

	public getCookieWithJwtRefreshToken(username: string) {
		const payload = { username: username };
		const token = this.jwtService.sign(payload, {
			secret: `${process.env.REFRESH_SECRET_KEY}`,
			expiresIn: "2592000s"
		});
		const cookie = `Refresh=${token}; HttpOnly; Path=/; SameSite=None; secure; Max-Age=2592000s`;
		return {
			cookie,
			token
		}
	}

	public getCookieWithJwtAccessToken(username: string) {
		const payload = { username: username };
		const token = this.jwtService.sign(payload, {
			secret: `${process.env.SECRET_KEY}`,
			expiresIn: `172800s`
		});
		const cookie = `Authentication=${token}; HttpOnly; Path=/; SameSite=None; secure; Max-Age=172800s`
		return {
			cookie,
			token
		}
	}

	public getCookiesForLogOut() {
		return [
			'Authentication=; HttpOnly; Path=/; SameSite=None; Max-Age=0',
			'Refresh=; HttpOnly; Path=/; SameSite=None; Max-Age=0'
		];
	}
}
