import { Card, Grid } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { FavouritePokemons } from "../../components/pokemon";
import { NoFavourites } from "../../components/ui";
import localFavourites from "../../utils/localFavourites";

const FavouritesPage = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavouritePokemons(localFavourites.pokemons());
  }, []);

  return (
    <Layout title="Pókemons - Favoritos">
      {favouritePokemons.length === 0 ? (
        <NoFavourites />
      ) : (
        <FavouritePokemons pokemons={favouritePokemons} />
      )}
    </Layout>
  );
};

export default FavouritesPage;
