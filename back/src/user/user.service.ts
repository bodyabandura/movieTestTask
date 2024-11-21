import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async create(userDto: Partial<User>): Promise<User> {
		const user = new this.userModel(userDto);
		return user.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().select('-password').exec();
	}

	async findOne(id: string): Promise<User> {
		const user = await this.userModel.findById(id).select('-password').exec();
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.userModel.findOne({ email }).exec();
		return user;
	}
}
