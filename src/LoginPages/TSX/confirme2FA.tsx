import type { verfyingEmail } from "../../model/verfyngEmal";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Reimgae from "../../../public/Picture/repass2.png";
import type { verfying2FA } from "../../model/Verfying2FA";
import type { RootState } from "../../SateRedux/Store";
import { useSelector } from "react-redux";
import type { LoginForm } from "../../model/loginform";
export default function Confirm2FA() {
  const Nav = useNavigate();
  const UserinfoState = useSelector((state: RootState) => state.userinfo);

  const [serchparms] = useSearchParams();
  const t: string | null = serchparms.get("t");
  const id: string | null = serchparms.get("id");

  if (t != null) {
    console.log("ut:" + t);
    console.log("id:" + id);

    useEffect(() => {
      var tok: verfying2FA = {
        tok: t,
        email: UserinfoState.email,
      };
      axios
        .post("http://localhost:8087/valdting2FA", tok)
        .then((Resonse) => {
          console.log("res:" + Resonse.data);
          console.log("User Vefyng2Fa:");

          var modelogn: LoginForm = {
            username: UserinfoState.email,
            password: "",
          };
          console.log("Model Login TO get token:", modelogn);
          console.log("Us:" + modelogn.username);
          if (Resonse.data == true) {
            axios
              .post("http://localhost:8087/gettoken", modelogn, {
                withCredentials: true,
              })
              .then((response) => {
                console.log("response gettoke:" + response.data);
                Nav("/home");
              })
              .catch((erro) => {
                console.log("error log:" + erro);
              });
          }
        })
        .catch((err) => {
          console.log("User not Vefyng2Fa:");
        });
    }, [t]);
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
          valdting process of 2FA in progress when routered complate we We guide
          you to main page
        </h1>
      </div>
    </div>
  );
}
