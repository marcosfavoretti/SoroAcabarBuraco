import { IsBase64, IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";

export class ValidHolesDto {
    @IsNotEmpty()
    //@IsBase64()
    @IsString()
    x64: string;

    @IsNotEmpty()
    @IsLatitude()
    latitude: string;

    @IsNotEmpty()
    @IsLongitude()
    longitude: string;

    @IsString()
    desc: string;
}
