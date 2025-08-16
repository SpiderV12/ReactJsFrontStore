import CardProduct from "./Cartadd";
import { use, useState } from "react";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectoDataProductHome } from "../../../SateRedux/slice/basicDataproducts";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const GETProduct = gql`
  query {
    allproduct {
      id
      nameProduct
      description
      price
      productThing {
        imageURL
      }
    }
  }
`;

export default function ContinerProduct() {
  const { data, loading, error } = useQuery(GETProduct);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const useNav = useNavigate();

  if (data != undefined) {
    dispatch(injectoDataProductHome(data.allproduct));
    const itemsPerPage = 15;
    const start = currentPage * itemsPerPage;
    const currentItems = data.allproduct.slice(start, start + itemsPerPage);
    return (
      <div>
        <div
          id="Continerproct"
          className="bg-[white] w-[100%] p-[11px] m-[3px] rounded-md grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 
     sm:grid-cols-2	  gap-4 h-[fit-content]"
        >
          {currentItems.map(
            (data: {
              id: number;
              description: string;
              nameProduct: string;

              price: number;
              productThing: {
                imageURL: string;
              };
            }) => (
              <CardProduct
                key={data.id}
                idproduct={data.id}
                Description={data.description}
                nameProduct={data.nameProduct}
                imageURL={data.productThing.imageURL}
                price={data.price}
              ></CardProduct>
            )
          )}
        </div>
        <ReactPaginate
          pageCount={Math.ceil(data.allproduct.length / itemsPerPage)}
          onPageChange={(event) => {
            setCurrentPage(event.selected);
          }}
          containerClassName="flex justify-center mt-6 gap-2"
          pageClassName="px-3 py-1 border rounded"
          activeClassName="bg-blue-500 text-white"
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>{error?.message}</p>
      </div>
    );
  }
}
