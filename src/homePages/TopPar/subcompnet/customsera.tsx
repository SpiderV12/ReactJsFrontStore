import { useSearchBox } from "react-instantsearch";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { algoliasearch } from "algoliasearch";
import type { SearchResponse } from "algoliasearch";
import { useState } from "react";
import CustomHits from "./customhits";
import { useNavigate } from "react-router-dom";
import type { SearchModel } from "../topBarModel/searchModel";
const client = algoliasearch("***", "**");

export default function CustomSearchBox() {
  const Nav = useNavigate();
  const [SearchInput, SetSerach] = useState({
    Input: "",
    typeSerach: "",
  });
  const { query, refine } = useSearchBox();

  return (
    <div className="flex w-full relative">
      {/* زر اختيار النوع */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="border-black border-[2px] p-[5px]  text-[#303150] oswald-medium h-[40px] bg-white">
            {SearchInput.typeSerach === "" ? "Type" : SearchInput.typeSerach}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {/* عناصر القائمة */}
          {["Category", "Price", "Name", "IdProduct"].map((type) => (
            <DropdownMenu.Item
              key={type}
              onSelect={() => SetSerach({ ...SearchInput, typeSerach: type })}
            >
              {type}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {/* حقل الإدخال */}
      <input
        className="border-black border-[2px] border-l-0 p-[5px]  text-[#303150] oswald-medium h-[40px] w-full bg-white"
        value={query}
        onChange={(e) => {
          SetSerach({ ...SearchInput, Input: e.target.value });
          refine(e.target.value);
        }}
        placeholder="Search"
      />

      {/* زر البحث */}
      <button
        className="border-black border-[2px] border-l-0 p-[5px]  text-[#303150] oswald-medium h-[40px] bg-white"
        onClick={() => {
          client
            .search([
              {
                indexName: "product",
                params: {
                  query: SearchInput.Input,
                  filters: `NameProduct:"${SearchInput.Input}"`,
                },
              },
            ])
            .then((res) => {
              const result = res.results[0] as SearchResponse<any>;
              const hits: any[] = result.hits;
              hits.map((v) => {
                console.log("nameproudct:", v);
                Nav(`/home/ProductPage/${hits[0].IdProduct}`);
              });
            });
        }}
      >
        Search
      </button>

      {/* نتائج البحث */}
      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md z-50 max-h-[300px] overflow-y-auto">
        <CustomHits />
      </div>
    </div>
  );
}
