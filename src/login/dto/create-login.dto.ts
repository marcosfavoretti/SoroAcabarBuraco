import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator"
import { PerfilAcesso } from "../entities/perfildeacesso.entity";
export class CreateLoginDto {

    @IsString()
    name: string;

    @IsString()
    cep: string

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('BR')
    telefone: string

    @IsString()
    rua: string

    @IsString()
    bairro: string

    @IsNumber()
    numero: number
}
