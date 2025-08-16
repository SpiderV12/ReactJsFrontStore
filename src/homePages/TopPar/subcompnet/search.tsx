import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useEffect } from "react";
import type { SearchModel } from "../topBarModel/searchModel";
import { useDispatch, type UseDispatch } from "react-redux";
import { algoliasearch } from "algoliasearch";
import { liteClient } from "algoliasearch/lite";
import CustomSearchBox from "./customsera";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
} from "react-instantsearch";

const client = liteClient("VDWYDIQQ8O", "2b42ff3086896a23d34f3be9857b3014");

export default function Search() {
  return (
    <InstantSearch searchClient={client} indexName="product">
      <CustomSearchBox></CustomSearchBox>
    </InstantSearch>
  );
}
