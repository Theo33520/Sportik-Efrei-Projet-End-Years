import { IsNotEmpty } from "class-validator";


export class sendAthleteCredentialsDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;
}