import { IsString } from "class-validator";

export class ValidateDto  {
    @IsString()
    name
    @IsString()
    password
}
    
