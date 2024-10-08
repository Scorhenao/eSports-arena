import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TeamPoint {
    @IsNumber()
    teamId: number; // ID del equipo

    @IsNumber()
    points: number; // Puntos a agregar
}

export class AddPointsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TeamPoint) // Necesario para la validación de objetos anidados
    @IsNotEmpty()
    teamPoints: TeamPoint[]; // Arreglo de TeamPoint
}
