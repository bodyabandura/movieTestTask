import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'


@Injectable()
export class FilesService {
	async CreateFile(image): Promise<string>{
		try {
			const fileName = uuid.v4() + '.jpg'
			const filePath = path.resolve(__dirname, '..', 'static')
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, {recursive: true})
			}
			const newPath = path.join(filePath, fileName)
			fs.writeFileSync(newPath, image.buffer)
			return fileName
		}
		catch (e){
			throw new HttpException("During downloading poster happened problem", HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}