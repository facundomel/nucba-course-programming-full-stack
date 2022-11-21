import React from "react";
import {
  CardsContainerStyled,
  CardStyled,
  CardTitleStyled,
  CardBodyStyled,
} from "./CardStyles";

export const Card = () => {
  return (
    <CardsContainerStyled>
      <CardStyled>
        <CardTitleStyled>Bran Stark</CardTitleStyled>
        <CardBodyStyled>
          <p>
            I was never going to be as good a lady as you. So I had to be
            something else. I never could have survived what you survived.
          </p>
        </CardBodyStyled>
      </CardStyled>

      <CardStyled>
        <CardTitleStyled>Tyrion Lannister</CardTitleStyled>
        <CardBodyStyled>
          <p>
            It's not easy being drunk all the time. If it were easy, everyone
            would do it.
          </p>
        </CardBodyStyled>
      </CardStyled>

      <CardStyled>
        <CardTitleStyled>Jon Snow</CardTitleStyled>
        <CardBodyStyled>
          <p>
            Sometimes there is no happy choice Sam, only one less grievous than
            the others.
          </p>
        </CardBodyStyled>
      </CardStyled>
    </CardsContainerStyled>
  )
};