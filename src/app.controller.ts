import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RegisterDto } from './auth/dto/register.dto';
import { LoginDto } from './auth/dto/login.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) { }

	@Get('hello')
	async checkBck() {
		return "HELLO FROM BACKEND"
	}

	@HttpCode(200)
	@Post('auth/login')
	async login(@Body() userData: LoginDto, @Res() res) {
		const user = this.authService.validateUser(userData);
		const accesscookie = this.authService.getCookieWithJwtAccessToken((await user).username);
		const refreshcookie = this.authService.getCookieWithJwtRefreshToken((await user).username);
		await this.usersService.setCurrentRefreshToken(refreshcookie.token, (await user).userId);
		res.setHeader('Set-Cookie', [accesscookie.cookie, refreshcookie.cookie]);
		return res.status(200).send("success");
	}

	@Post('auth/register')
	async register(@Body() createUserDto: RegisterDto, @Res() res) {
		const user = this.authService.register(createUserDto);
		const accesscookie = this.authService.getCookieWithJwtAccessToken((await user).username);
		const refreshcookie = this.authService.getCookieWithJwtRefreshToken((await user).username);
		await this.usersService.setCurrentRefreshToken(refreshcookie.token, (await user).userId);
		res.setHeader('Set-Cookie', [accesscookie.cookie, refreshcookie.cookie]);
		return res.status(200).send('success');
	}

	@UseGuards(JwtAuthGuard)
	@Get('auth/logout')
	async logout(@Res() res, @Req() req) {
		res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut())
		return res.status(200).send();
	}

	@UseGuards(JwtAuthGuard)
	@Get('auth/me')
	async getMe(@Req() req) {
		const user = this.authService.getUserFromJwt(req.cookies.Authentication);
		(await user).password = undefined;
		(await user).currentHashedRefreshToken = undefined;
		return user;
	}

	@UseGuards(JwtAuthGuard)
	@Get('check/me')
	async checkMe() {
		return {
			success: true
		}
	}

}
