import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Flavor } from '../entities/flavor.entity';

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
    readonly flavors!: Flavor[];
}
