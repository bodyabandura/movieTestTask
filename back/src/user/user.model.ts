import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import {Movie} from "../movie/movie.model";

@Schema()
export class User extends Document {
	@ApiProperty({ example: 'John Doe', description: 'The name of the user' })
	@Prop({ required: true })
	name: string;

	@ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
	@Prop({ required: true, unique: true })
	email: string;

	@ApiProperty({ example: 'securepassword', description: 'The password of the user', writeOnly: true })
	@Prop({ required: true })
	password: string;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'The date when the user was created' })
	@Prop({ default: Date.now })
	createdAt: Date;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'The date when the user was updated' })
	@Prop({ default: Date.now })
	updatedAt: Date;
}


export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save', async function (next) {
	const user = this as User;
	if (!user.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	next();
});