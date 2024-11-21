import {Injectable, UnauthorizedException, BadRequestException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UserService} from '../user/user.service';
import {LoginDTO} from "./dtos/login.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {
	}

	async register(userDto: any): Promise<any> {
		const existingUser = await this.userService.findByEmail(userDto.email);
		if (existingUser) {
			throw new BadRequestException('User with such email already exists');
		}

		const newUser = await this.userService.create(userDto,);

		return {message: 'User registered successfully', userId: newUser.id};
	}

	async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
		const user = await this.userService.findByEmail(loginDTO.email);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = {userId: user.id, email: user.email};
		const accessToken = this.jwtService.sign(payload);

		return {accessToken};
	}
}

