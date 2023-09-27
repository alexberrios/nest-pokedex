import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';


@Injectable()
export class SeedService {

  private readonly axios : AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
    
  ) { }
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemones : { name: string, no: number }[] = [];
    data.results.forEach(({ name, url })=>{
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      const pokemon = { name, no };
      console.log({ name, no })
      pokemones.push(pokemon);
    });
    const pokeRest = await this.pokemonModel.create(pokemones);

    return 'SEDD Excetuted';
  }
}
