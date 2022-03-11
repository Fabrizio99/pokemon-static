import { GetStaticProps } from "next";
import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pókemons">
      <ul>
        {pokemons.map(({ id, name }) => (
          <li key={id}>
            # {id} - {name}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((p, i) => {
    const splittedUrl = p.url.split("/");
    const id = Number(splittedUrl[splittedUrl.length - 2]);

    return {
      ...p,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    };
  });
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
