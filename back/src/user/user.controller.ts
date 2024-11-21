import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiParam, ApiResponse} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.model';
import { authGuard } from "../guards/auth.guard";

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
  @UseGuards(authGuard)
	@ApiOperation({ summary: 'Retrieve all users' })
	@ApiResponse({ status: 200, description: 'List of all users', type: [User] })
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Retrieve a user by ID' })
	@ApiResponse({ status: 200, description: 'User found by id', type: User})
	@ApiParam({ name: 'id', description: 'The ID of the user' })
	async findOne(@Param('id') id: string): Promise<User> {
		return this.userService.findOne(id);
	}
}
