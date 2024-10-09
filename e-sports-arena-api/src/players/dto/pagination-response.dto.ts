import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
    @ApiProperty({
        description: 'Dates solicitated from the page',
        isArray: true,
    })
    data: T[];

    @ApiProperty({ description: 'Current page', example: 1 })
    page: number;

    @ApiProperty({
        description: 'Quantity of results per page',
        example: 10,
    })
    limit: number;

    @ApiProperty({ description: 'total count of results', example: 100 })
    totalCount: number;

    @ApiProperty({ description: 'Number of pages', example: 10 })
    totalPages: number;
}
