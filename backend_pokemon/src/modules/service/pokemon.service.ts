import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { PokemonResponseDto } from '../dto/pokemon_response_dto';

type PokemonCache = {
  pokemonData: PokemonResponseDto;
  expireTime: number;
};

@Injectable()
export class PokemonService {

  private pokemonCache = new Map<string, PokemonCache>();
  private readonly cacheDurationMs = 2 * 60 * 1000;

  constructor(private readonly httpService: HttpService) {}

  async getPokemonByName(pokemonName: string): Promise<PokemonResponseDto> {

    const normalizedName = pokemonName.trim().toLowerCase();
    const currentTime = Date.now();

    const cachedPokemon = this.pokemonCache.get(normalizedName);
    if (cachedPokemon && cachedPokemon.expireTime > currentTime) {
      return cachedPokemon.pokemonData;
    }

    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${normalizedName}`;

      const response = await firstValueFrom(
        this.httpService.get<{
          id: number;
          name: string;
          types: { type: { name: string } }[];
          abilities: { ability: { name: string } }[];
          sprites: {
            other: {
              "official-artwork": {
                front_default: string;
              };
            };
          };
        }>(apiUrl)
      );

      const apiData = response.data;

      const pokemonResponse: PokemonResponseDto = {
        id: apiData.id,
        name: apiData.name,
        types: apiData.types.map(t => t.type.name),
        image: apiData.sprites.other["official-artwork"].front_default,

        abilities: apiData.abilities
          .slice(0, 3)
          .map(a => a.ability.name),
      };

      this.pokemonCache.set(normalizedName, {
        pokemonData: pokemonResponse,
        expireTime: currentTime + this.cacheDurationMs,
      });

      return pokemonResponse;
    } catch {
      throw new NotFoundException("Pokémon no encontrado");
    }
  }
}