import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoffeeDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    readonly brand!: string;

    @IsDefined()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    readonly flavors!: string[];
}
