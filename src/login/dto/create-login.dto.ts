import {IsString} from "class-validator"
export class CreateLoginDto {
    @IsString()
    name
    @IsString()
    password
    @IsString()
    email
}
