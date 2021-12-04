import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
				return request?.cookies?.AdminToken;
			}]),
			ignoreExpiration: false,
			secretOrKey: `${process.env.ADMIN_SECRET_KEY}`,
		});
	}

	async validate(payload: any) {
		return { username: payload.username };
	}
}