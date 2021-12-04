import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
	constructor(
		private jwtService: JwtService
	) { }

	async login(adminDto: AdminDto) {
		if (adminDto.username == 'almaz' && adminDto.password == 'kimya') {
			const payload = { username: adminDto.username };
			const token = this.jwtService.sign(payload, {
				secret: `${process.env.ADMIN_SECRET_KEY}`,
				expiresIn: `2592000s`
			});
			return {
				token: `AdminToken=${token}; HttpOnly; Path=/; SameSite=None; Max-Age=2592000s`,
				status: true
			}

		} else {
			throw new HttpException('Not valid', HttpStatus.NOT_FOUND);
		}
	}
}
