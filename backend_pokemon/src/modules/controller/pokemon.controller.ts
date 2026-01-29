import { Controller, Get, Param } from "@nestjs/common";
import { PokemonService } from "../service/pokemon.service";
import { PokemonResponseDto } from "../dto/pokemon_response_dto"; 

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(":name")
  getPokemonByName(@Param("name") name: string): Promise<PokemonResponseDto> {
    return this.pokemonService.getPokemonByName(name);
  }
}