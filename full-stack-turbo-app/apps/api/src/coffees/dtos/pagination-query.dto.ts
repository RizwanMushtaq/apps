import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
    @IsPositive()
    @IsOptional()
    readonly limit!: number;

    @IsPositive()
    @IsOptional()
    readonly offset!: number;
}
