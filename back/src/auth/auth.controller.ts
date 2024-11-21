import {Controller, Post, Body, UsePipes} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiBody, ApiResponse} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {User} from "../user/user.model";
import {CreateUserDTO} from "../user/dtos/user.dto";
import {ValidatorPipes} from "../pipes/validation.pipe";
import {LoginDTO} from "./dtos/login.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@UsePipes(ValidatorPipes)
	@ApiOperation({ summary: 'Register a new user' })
	@ApiResponse({status: 200, type: String})
	async register(@Body() userDto: CreateUserDTO):Promise<{message: string, userId: string}> {
		return this.authService.register(userDto);
	}

	@Post('login')
	@UsePipes(ValidatorPipes)
	@ApiOperation({ summary: 'Login a user' })
	@ApiResponse({status: 200, type: String})
	async login(@Body() loginDTO: LoginDTO ):Promise<{ accessToken: string }> {
		return this.authService.login(loginDTO);
	}
}
