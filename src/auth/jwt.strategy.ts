import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
				return request?.cookies?.Authentication;
			}]),
			ignoreExpiration: false,
			secretOrKey: `${process.env.SECRET_KEY}`,
		});
	}

	async validate(payload: any) {
		return { username: payload.username }
	}
}