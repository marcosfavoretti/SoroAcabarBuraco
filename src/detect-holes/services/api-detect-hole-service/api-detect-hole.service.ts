import { HttpException, Injectable } from '@nestjs/common';
import axios from "axios"
import { ImageOperationsService } from '../image-operations-service/image-operations.service';
@Injectable()
export class ApiDetectHoleService {
    constructor(private image: ImageOperationsService) { }
    async callApiDetectHole(x64: string) {
        const resized_x64 = await this.image.resize640x640(x64)
        const n_holes = await axios.post("http://127.0.0.1:8000", {
            x64: resized_x64
        }).then((result) => {
            return result.data
        }).catch(
            () => {
                throw new HttpException("backend de processamento de imagem fora do ar", 500)
            })//isso volta a quantidade de buracos na img
        return n_holes
    }

    async localeInformation(latitude: number, longitude: number) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        const { data } = await axios.get(url)
        const { address } = data
        const { quarter, road } = address
        return { quarter: quarter, road: road }
    }
}
