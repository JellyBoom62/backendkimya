import { Controller, Post, Body, Get, UseGuards, Res, HttpCode, Req } from '@nestjs/common';
import { AdJwtAuthGuard } from 'src/admin/adjwt.guard';
import { UsersService } from 'src/users/users.service';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
	constructor(
		private adminService: AdminService,
		private usersService: UsersService
	) { }

	@HttpCode(200)
	@Post('login')
	async login(@Body() adminDto: AdminDto, @Res() res) {
		const adminToken = this.adminService.login(adminDto);
		res.setHeader('Set-Cookie', (await adminToken).token);
		return res.status(200).send((await adminToken).status);
	}

	@UseGuards(AdJwtAuthGuard)
	@Get('logout')
	async logout(@Res() res, @Req() req) {
		this.usersService.deleteRefreshToken(req.cookies.AdminToken)
		res.setHeader('Set-Cookie', 'AdminToken=; HttpOnly; Path=/; SameSite=None; Max-Age=0')
		return res.status(200).send()
	}

	@UseGuards(AdJwtAuthGuard)
	@Get('me')
	async adminMe() {
		return {
			success: true
		}
	}
}
