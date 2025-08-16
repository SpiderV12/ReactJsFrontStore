import { undefined, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import "reflect-metadata";
import { schemalogin } from "../../valdtionForm/schema/lognschema";
import type { UseFormtype } from "../../valdtionForm/types/logintype";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Injctionuserdata } from "../../SateRedux/slice/userinfobase";
import { useSelector } from "react-redux";
import type { RootState } from "../../SateRedux/Store";
import Reimgae from "../../../public/Picture/repass2.png";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  useEffect(() => {
    Cookies.remove("acces_token", { path: "/login" });
  }, []);
  const Nav = useNavigate();
  const Userinfo = useDispatch();
  const UserinfoState = useSelector((state: RootState) => state.userinfo);

  const [err, setErro] = useState("");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UseFormtype>({
    resolver: zodResolver(schemalogin),
  });
  const sumbitvalid = () => {
    console.log("method work ");

    let logindata = {
      username: getValues("email"),
      password: getValues("pass"),
    };
    Userinfo(
      Injctionuserdata({
        emal: logindata.username,
        usrname: logindata.username,
        phone: "",
      })
    );
    console.log("form data", logindata);

    axios
      .post("http://localhost:8087/checkUser", logindata, {})
      .then((response) => {
        if (response.status == 200) {
          console.log("User Exxit:");
          window.alert(response.data);
        }
      })
      .catch((error) => {
        console.log("error1 is -> " + error);
      });

    setErro("");
  };
  const sumbitinvalide = () => {
    console.log("err");
    setErro("password  wrong or Email wrong");
  };

  return (
    <div
      id="basic_layout"
      className="flex flex-row  text-blue-600/100 "
      style={{ height: "100vh" }}
    >
      <div
        id="left"
        className="left_size flex flex-col  oswald-medium justify-center text-[#000000]   flex-wrap gap-10 bg-[beige] "
      >
        <h2 className="text-center   text-[40px] ">Make Login </h2>
        <p className="text-center  text-[35px] p-[10px]">
          welcome to Ultra store enjoy in marking
        </p>
      </div>

      <div
        id="Right"
        className="bg-[darkcyan] right_size  relative bg-contain		"
        style={{ backgroundImage: `url(${Reimgae})` }}
      >
        <div
          id="Continer_fileds"
          className="flex flex-col drop-shadow-lg drop-shadow-cyan-500/50  oswald-medium text-[#000000] relative gap-[15px]  bg-[beige] continer_form_size justify-center content-center  flex-wrap flex-wrap  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-[20px] border-cyan-500 border-solid"
        >
          <form
            className="flex flex-col oswald-medium text-[#000000] relative gap-[15px]   continer_form_size justify-center content-center  flex-wrap flex-wrap    rounded-[20px] border-cyan-500 border-solid"
            onSubmit={handleSubmit(sumbitvalid, sumbitinvalide)}
          >
            <h3 className="oswald-medium text-[39px] text-center relative bottom-[10%]">
              Welcome
            </h3>
            <input
              {...register("email")}
              placeholder=" email"
              className="bg-[#fffafa] fildsSize_of_contner border-[1px] rounded-[8px] border-cyan-500 border-solid p-[6px]"
            ></input>
            <button
              onClick={(ev) => {
                ev.preventDefault();
                console.log("uss:" + UserinfoState.email);
                axios
                  .post(
                    "http://localhost:8087//api/SingInprocess/LoginForgetPss",
                    null,
                    {
                      params: {
                        usernamEmal: UserinfoState.email,
                      },
                    }
                  )
                  .then((respne) => {
                    window.alert(respne.data);
                  })
                  .catch((erro) => {
                    window.alert(erro);
                  });
              }}
              className="text-cyan-800 underline underline-offset-4"
            >
              Forgot Password?
            </button>
            <input
              {...register("pass")}
              placeholder=" password"
              className="bg-[#fffafa]  fildsSize_of_contner  border-[1px] rounded-[8px] border-cyan-500 border-solid p-[6px]"
              type="password"
            ></input>
            <h5 className="text-red-500">{err}</h5>
            <button
              className="bg-[#fffafa] relative top-[10%] butoon_spic"
              type="submit"
            >
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
