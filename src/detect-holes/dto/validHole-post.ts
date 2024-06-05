import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";

export class ValidHolesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    x64: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsLatitude()
    latitude: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsLongitude()
    longitude: number;
    @ApiProperty()
    @IsString()
    desc: string;
}
