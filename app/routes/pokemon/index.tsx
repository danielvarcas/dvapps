import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

async function getPokemon() {
  const interval = {
    limit: 10,
    offset: 0,
  };

  const response = await P.getPokemonsList(interval);
  return response;
}

type LoaderData = {
  pokemonItems: Pokedex.NamedAPIResourceList;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    pokemonItems: await getPokemon(),
  };

  return json(data);
};

export default function PokemonRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <h1>Pokémon</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <ol>
        {data.pokemonItems.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ol>
    </>
  );
}
