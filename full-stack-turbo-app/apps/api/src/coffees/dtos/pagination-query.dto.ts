import { IsDefined, IsNotEmpty, IsPositive } from 'class-validator';

export class PaginationQueryDto {
    @IsPositive()
    @IsDefined()
    @IsNotEmpty()
    readonly limit!: number;

    @IsPositive()
    @IsDefined()
    @IsNotEmpty()
    readonly offset!: number;
}
