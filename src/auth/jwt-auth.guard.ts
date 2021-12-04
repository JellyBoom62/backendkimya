import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private authService: AuthService) { }
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const succes = this.authService.isTokenSuccess(`${request.cookies.Authentication}`);
		if (await succes == false) {
			throw new UnauthorizedException;
		}
		return true;
	}
}