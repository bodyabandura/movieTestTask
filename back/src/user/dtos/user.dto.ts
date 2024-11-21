import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDTO {
	@ApiProperty({example: "User"})
	@IsString({message: "name must be string"})
	readonly name: string

	@ApiProperty({example: "user@gamil.com"})
	@IsEmail({}, {message: "Email is invalid"})
	readonly email: string

	@ApiProperty({example:"1111"})
	@Length(4, 16,{ message: "Length of Password must be > 4 and < 16"})
	readonly password: string
}