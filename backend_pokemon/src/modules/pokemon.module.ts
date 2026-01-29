import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PokemonController } from "./controller/pokemon.controller";
import { PokemonService } from "./service/pokemon.service";

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}