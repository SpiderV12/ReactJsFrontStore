import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type { RootState } from "../../../SateRedux/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { injectonWishlst } from "../../../SateRedux/slice/wishlstuser";
export default function CardProduct({
  Description,
  nameProduct,
  imageURL,
  price,
  idproduct,
}: {
  Description: string;
  nameProduct: string;
  imageURL: string;
  price: number;
  idproduct: number;
}) {
  const Nav = useNavigate();
  const useWishdis = useDispatch();

  let userwithlist = useSelector((state: RootState) => state.userWishL);

  return (
    <div
      id="card"
      style={{ width: "14.6rem", height: "21rem" }}
      className="bg-[ghostwhite] rounded-md overflow-hidden shadow-md flex flex-col shadow-xl/30



"
    >
      <div className="h-[45%] w-full overflow-hidden flex items-center justify-center bg-white">
        <img className="object-contain h-[135px] " src={imageURL} alt="Card" />
      </div>
      <div
        id="card-body"
        className="p-1 flex-1 flex flex-col justify-between h-[55%] bg-[#303846] text-[ghostwhite] "
      >
        <div className=" h-[75%]">
          <h5 className=" font-semibold mb-2">{nameProduct}</h5>
          <h6 className=" ">{Description}</h6>
        </div>

        <div
          id="Cardbtn"
          className="  text-[#303150]  bg-[ghostwhite]  p-[2px] flex flex-row h-[21%] justify-around flex-wrap content-center oswald-medium"
          style={{
            borderRadius: "4px",
          }}
        >
          <button
            className=" hover:bg-[cadetblue] transition-all duration-400  p-[3px]"
            style={{
              textDecoration: "none",
              color: "#303150",
              borderRadius: "3px",
            }}
            onClick={(e) => {
              e.preventDefault();
              Nav(`/home/ProductPage/${idproduct}`);
            }}
          >
            {price}$
          </button>

          <button
            className=" p-[3px]  hover:bg-[cadetblue] transition-all duration-400"
            style={{
              borderRadius: "3px",
            }}
            onClick={async (e) => {
              let found = false;
              console.log("iteamid:", idproduct);
              console.log("wshlst:", userwithlist);
              userwithlist.map((i) => {
                if (i.productid == idproduct) {
                  window.alert("is Exixt");
                  found = true;
                  return;
                }
              });

              if (!found) {
                try {
                  const response = await axios.post(
                    "http://localhost:8087/api/WishListBascOP/addPtoWithlist",
                    null,
                    {
                      withCredentials: true,
                      params: { IdPRODUT: idproduct },
                    }
                  );
                  useWishdis(injectonWishlst(response.data));
                  window.alert("Response: " + response.data);
                  console.log("Response:", response.data);
                } catch (error) {
                  console.error("Error:", error);
                }
              }
            }}
          >
            WishList
          </button>
          <button
            className="   p-[3px] hover:bg-[cadetblue] transition-all duration-400 "
            style={{
              borderRadius: "3px",
            }}
          >
            Cart
          </button>
        </div>
      </div>
    </div>
  );
}
