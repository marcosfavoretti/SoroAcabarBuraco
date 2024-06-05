import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator"
import { PerfilAcesso } from "../entities/perfildeacesso.entity";
import {ApiProperty} from "@nestjs/swagger"
export class CreateLoginDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    cep: string
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsPhoneNumber('BR')
    telefone: string
    @ApiProperty()
    @IsString()
    rua: string
    @ApiProperty()
    @IsString()
    bairro: string
    @ApiProperty()
    @IsNumber()
    numero: number
}
