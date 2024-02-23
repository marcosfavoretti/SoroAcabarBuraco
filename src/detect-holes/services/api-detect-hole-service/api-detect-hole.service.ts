import { HttpException, Injectable } from '@nestjs/common';
import axios from "axios"
import { ImageOperationsService } from '../image-operations-service/image-operations.service';
@Injectable()
export class ApiDetectHoleService {
    constructor(private image: ImageOperationsService) { }
    async callApiDetectHole(x64: string): Promise<number> {
        const resized_x64 = await this.image.resize640x640(x64)
        const n_holes = await axios.post("http://127.0.0.1:8000", {
            x64: resized_x64
        }).then((result) => {
            const { nHoles } = result.data
            return +nHoles
        }).catch(
            () => {
                throw new HttpException("backend de processamento de imagem fora do ar", 500)
            })//isso volta a quantidade de buracos na img
        return n_holes
    }
}
