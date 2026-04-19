import { IsDefined, IsNotEmpty } from 'class-validator';

export class PaginationQueryDto {
    @IsDefined()
    @IsNotEmpty()
    readonly limit!: number;

    @IsDefined()
    @IsNotEmpty()
    readonly offset!: number;
}
