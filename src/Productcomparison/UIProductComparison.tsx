import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { string, z } from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../SateRedux/Store";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

export default function ProductComparison() {
  const TextareaRef = useRef<HTMLTextAreaElement>(null);
  const productstate = useSelector((state: RootState) => state.basicproudct);
  const prodtccomp = z.object({
    productdeatil: z.string(),
  });

  const productscompares = z.object({
    produc: z.array(prodtccomp),
  });
  type compare = z.infer<typeof productscompares>;
  const {
    register,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<compare>({
    resolver: zodResolver(productscompares),
    defaultValues: {
      produc: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "produc",
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          (e) => {
            let FinalMassg = `The subject is a systematic,
             scientific, and precise comparison between the following products 
             in an organized and coordinated manner. 
             The result will be a comprehensive comparison that presents the advantages and disadvantages of each product
              and which products are best in assisting consumers in making their choice.
             The products are as follows: 
            [`;
            console.log("right -> data -> ", e.produc);
            e.produc.map((Products, index) => {
              FinalMassg = FinalMassg.concat(" ", Products.productdeatil);
              if (index != e.produc.length - 1) {
                FinalMassg = FinalMassg.concat("  and");
              } else {
                FinalMassg = FinalMassg.concat("]");
              }
            });
            FinalMassg = FinalMassg.concat(
              "and an additional point is that the result should be concise and cover the essential points without being overly verbose but still of high value."
            );
            console.log("final massge:", FinalMassg);

            axios
              .post("http://localhost:5216/api/ChatGeminUsege/CompareProduct", {
                Massge: FinalMassg,
              })
              .then((response) => {
                console.log(
                  "Respomse ->",
                  response.data.candidates[0].content.parts[0].text
                );
                if (TextareaRef.current) {
                  TextareaRef.current.value =
                    response.data.candidates[0].content.parts[0].text;
                }
              })
              .catch((err) => console.log("erro", err));
          },
          (err) => {
            console.log("errr->" + err.produc);
          }
        )}
      >
        {fields.map((fild, index) => (
          <div key={fild.id}>
            <select {...register(`produc.${index}.productdeatil`)}>
              {productstate.map((value) => {
                return (
                  <option key={value.id}>
                    {value.nameProduct + " " + value.description}
                  </option>
                );
              })}
            </select>
            <button type="button" onClick={() => remove(index)}>
              {" "}
              Reamove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              productdeatil: "",
            })
          }
        >
          {" "}
          add proudct
        </button>
        <button type="submit">sumbit</button>
      </form>
      <textarea
        className="
        h-dvh
    block          
    w-full         
    rounded-md    
    border           
    border-gray-300 
    p-2             
    text-gray-900   
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
    resize       
  "
        ref={TextareaRef}
        readOnly
      ></textarea>
    </div>
  );
}
