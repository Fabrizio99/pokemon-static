import { GetStaticProps } from "next";
import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pókemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </Grid.Container>
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
