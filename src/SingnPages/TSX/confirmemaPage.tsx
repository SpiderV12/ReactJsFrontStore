import type { verfyingEmail } from "../../model/verfyngEmal";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Reimgae from "../../../public/Picture/repass2.png";

import LinearProgress from "@mui/material/LinearProgress";
import bgImagesing from "../../assets/singphota.jpg";

export default function Confirmemal() {
  const Nav = useNavigate();

  const [serchparms] = useSearchParams();
  const id_user: string | null = serchparms.get("userId");
  const tokenget: string | null = serchparms.get("token");
  if (id_user != null && tokenget != null) {
    console.log("token:" + tokenget + "\ " + "user id:" + id_user);
    const varfyingtokeemal: verfyingEmail = {
      user_id: id_user,
      token: tokenget,
    };
    useEffect(() => {
      axios
        .post(
          "http://localhost:5216/api/SingInprocess/Register/GenlinkverfyngEmail/isvalid",
          varfyingtokeemal
        )
        .then((Resonse) => {
          console.log("res:" + Resonse.data);
          if (Resonse.data == true) {
            Nav("/login");
          }
        })
        .catch((err) => {
          console.log("reerrs:" + err);
        });
    }, [id_user, tokenget]);
  }
  return (
    <div
      className="h-[100vh] w-[100%]  relative"
      style={{
        backgroundImage: `url(${Reimgae})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          backgroundColor: "ghostwhite",
        }}
        className=" shadow-xl/30 h-[60vh] w-[60%] bg-[honeydew] rounded-lg text-center absolute top-[50%] left-1/2 translate-x-[-50%] translate-y-[-50%] transform "
      >
        <h1 className=" font-black text=[cadetblue] text-shadow-xs top-[50%] absolute  translate-y-[-50%] transform text-[28px] oswald-medium p-[20px]">
          valdting process in progress when routered complate we We guide you to
          main page
        </h1>
      </div>
    </div>
  );
}
