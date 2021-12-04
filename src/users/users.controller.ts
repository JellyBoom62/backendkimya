import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdJwtAuthGuard } from 'src/admin/adjwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) { }

	@UseGuards(AdJwtAuthGuard)
	@Get()
	async getAll() {
		return this.usersService.getAll()
	}
}
