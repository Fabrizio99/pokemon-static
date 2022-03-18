import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Pokemon } from "../../interfaces";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavourites, setIsInFavourites] = useState(
    localFavorites.existInFavourite(pokemon.id)
  );
  const onToggleFavourite = () => {
    localFavorites.toggleFavourite(pokemon.id);
    setIsInFavourites(!isInFavourites);

    if (isInFavourites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavourites}
                onClick={onToggleFavourite}
              >
                {isInFavourites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex" direction="row" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((v, i) => `${i + 1}`);

  return {
    paths: pokemon151.map((id) => ({ params: { id } })),

    // fallback blocking permite que se pueda recibir cualquier tipo de parámetro
    // si se desea limitar a solo los paths definidos, colocar en false
    // fallback: "blocking",
    fallback: false,
  };
};

export default PokemonPage;
