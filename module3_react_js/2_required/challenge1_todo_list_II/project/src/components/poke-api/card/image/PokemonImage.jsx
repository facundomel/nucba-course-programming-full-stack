import React from "react";
import {
  ImageBoxStyled,
  ImageContainerStyled,
  ImageShadowStyled,
} from "./PokemonImageStyles";

const PokemonImage = ({ image, alt }) => {
  return (
    <ImageContainerStyled>
      <ImageBoxStyled>
        <img src={image} alt={alt} />
      </ImageBoxStyled>
    </ImageContainerStyled>
  );
};

export default PokemonImage;
