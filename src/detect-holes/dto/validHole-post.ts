import { IsBase64, IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";

export class ValidHolesDto {
    @IsNotEmpty()
    //@IsBase64()
    @IsString()
    x64: string;

    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @IsNotEmpty()
    @IsLongitude()
    longitude: number;

    @IsString()
    desc: string;
}
