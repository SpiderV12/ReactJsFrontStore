import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../SateRedux/Store";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Reimgae from "../../../public/Picture/repass2.png";
import Button from "@mui/material/Button";
export default function RePass() {
  const UserinfoState = useSelector((state: RootState) => state.userinfo);
  const Nav = useNavigate();
  const [getNewone, setNewone] = useState({
    newPass: "",
    ReNewPass: "",
  });
  const [serchparms] = useSearchParams();
  const id_user: string | null = serchparms.get("userId");
  const tokenget: string | null = serchparms.get("token");
  return (
    <div
      style={{
        backgroundImage: `url(${Reimgae})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-[100vh] w-[100%] absolute "
    >
      <div
        className="relative  h-[60vh] w-[70%]  sm:w-[42%] rounded-2xl
    shadow-lg shadow-indigo-700/100  bg-[seashell]  top-[52%] left-1/2 translate-x-[-50%] translate-y-[-50%]
    flex flex-col   justify-evenly gap-[6%] flex-wrap content-center items-center"
      >
        <div id="head">
          <h1 className="oswald-medium font-[25px]">Re-password Operation</h1>
        </div>
        <div id="bodey" className="flex flex-col gap-[11px] ">
          <div id="firsttime" className="flex flex-col  gap-[10px] ">
            <label className="oswald-medium">Enter New Password</label>
            <input
              className="Repassinputs shadow-lg shadow-indigo-500/60 oswald-medium "
              name="new pass"
              value={getNewone.newPass}
              onChange={(eve) => {
                setNewone({ ...getNewone, newPass: eve.target.value });
              }}
            ></input>
          </div>
          <div id="sconed" className="flex flex-col gap-[10px] ">
            <label className="oswald-medium">Re-Enter New Password</label>

            <input
              name="new pass"
              className="Repassinputs shadow-lg shadow-indigo-500/60 oswald-medium "
              value={getNewone.ReNewPass}
              onChange={(eve) => {
                setNewone({ ...getNewone, ReNewPass: eve.target.value });
              }}
            ></input>
          </div>
        </div>

        <button
          className="flex flex-col bg-[darkcyan]  w-[24%] h-[10%] rounded-[6px] justify-center text-[19px] text-[beige] oswald-medium font-bold"
          onClick={(eve) => {
            eve.preventDefault();
            axios
              .post(
                "http://localhost:5216/api/SingInprocess/LoginForgetPss/valdtnfToken",
                {
                  IdUser: id_user,
                  TokenValdtinf: tokenget,
                  Repass: getNewone.newPass,
                  ReEnter: getNewone.ReNewPass,
                }
              )
              .then((respose) => {
                if (respose.data == true) {
                  window.alert("Passwprd is Change");
                  Nav("/login");
                }
              })
              .catch((error) => {
                window.alert("error -> " + error);
              });
          }}
        >
          Sumbit
        </button>
      </div>
    </div>
  );
}
