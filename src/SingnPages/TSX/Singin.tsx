import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import type { Registertype } from "../../model/regester";
import { Singinschema } from "../../valdtionForm/schema/Snginschema";
import type { UseSingFormtype } from "../../valdtionForm/types/Singformtype";
import countries from "world-countries";
import bgImagesing from "../../assets/singphota.jpg";
import { useDispatch } from "react-redux";
import { Injctionuserdata } from "../../SateRedux/slice/userinfobase";
import type { verfyingPhone } from "../../model/ValdtingSinginPhone";
import Reimgae from "../../../public/Picture/repass2.png";

type idd = {
  root: string;
  suffixes: string[];
};

type MyCountryOption = {
  label: string;
  value: string;
  iddcouyrty: idd;
};

const options: MyCountryOption[] = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
  iddcouyrty: country.idd,
}));

export default function SingPage() {
  const Nav = useNavigate();
  const Userinfo = useDispatch();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UseSingFormtype>({
    resolver: zodResolver(Singinschema),
  });
  return (
    <div
      style={{
        backgroundImage: `url(${Reimgae})`,
      }}
      className="flex flex-col h-screen w-full relative  h-[80vh] gap-[2px] "
    >
      <div
        className=" 
 absolute top-[50%] oswald-medium w-[60%] h-[68%] bg-[whitesmoke] 
   left-1/2 translate-x-[-50%] translate-y-[-50%] transform  w-[95%] 
    sm:w-[65%] h-[95%]   fill-white drop-shadow-xl/50 rounded-lg flex flex-row"
      >
        <form
          onSubmit={handleSubmit(
            () => {
              console.log("vLED INFO");
              var DTORegister: Registertype = {
                username: getValues("username"),
                pass: getValues("pass"),
                email: getValues("email"),
                age: getValues("age"),
                Country: getValues("Country"),
                codephone: getValues("codephone"),
                phone: getValues("phone"),
              };
              console.log("DTORegster:", DTORegister);
              axios
                .post(
                  "http://localhost:5216/api/SingInprocess/Register",
                  DTORegister
                )
                .then((respone) => {
                  if (respone.data == "IS_CRETED") {
                    console.log("response:" + respone.data);
                    Userinfo(
                      Injctionuserdata({
                        usrname: getValues("username"),
                        emal: getValues("email"),
                        phone: getValues("codephone") + getValues("phone"),
                      })
                    );
                    const Phonevefying: verfyingPhone = {
                      phone:
                        getValues("codephone").toString() + getValues("phone"),
                      code: "",
                      username: "",
                    };
                    console.log(
                      "Phone well wen code to t:" + Phonevefying.phone
                    );
                    axios
                      .post(
                        "http://localhost:5216/api/SingInprocess/Register/GenOTP",
                        Phonevefying
                      )
                      .then((resone) => {
                        if (resone.data == "SENDING") {
                          Nav("/Singin/valdtinSingin");
                        }
                      })

                      .catch((Eroo) => console.log("erro:" + Eroo));
                  } else {
                  }
                })
                .catch((error) => {
                  console.log("erroe:" + error);
                });
            },
            (errors) => {
              console.log(errors); // هذا يعرض جميع الأخطاء بوضوح
              console.log("wronf");
            }
          )}
          method="Post"
          className="flex flex-col relative w-[50%] h-[100%]  p-[10px] gap-[8px] items-center   "
        >
          <div
            id="leftfldes"
            className="flex flex-col flex-warp gap-[8px] w-[100%]"
          >
            <label>Username</label>
            <input
              className="rounded-sm bg-[white] pl-[3px] h-[35px] w-[100%]"
              {...register("username")}
            ></input>
            <p className="erro">{errors.username?.message}</p>

            <label>Eamil</label>
            <input
              className=" rounded-sm bg-[white] pl-[3px] h-[35px] w-[100%]"
              type="email"
              {...register("email")}
            ></input>
            <p className="erro">{errors.email?.message}</p>

            <label>password</label>
            <input
              className="rounded-sm bg-[white] pl-[3px] h-[35px] w-[100%]"
              type="password"
              {...register("pass")}
            ></input>
            <p className="erro">{errors.pass?.message}</p>
          </div>

          <div
            id="rightfildes"
            className="flex flex-col  gap-[8px]  w-[100%]  gap-[8px]"
          >
            <label>age</label>
            <input
              className="rounded-sm bg-[white] pl-[3px] h-[35px] w-[100%] "
              type="number"
              {...register("age", { valueAsNumber: true })}
            ></input>

            <label>Country</label>
            <select
              className="rounded-sm bg-[white] pl-[3px] h-[35px] w-[100%]"
              {...register("Country")}
            >
              {options.map((valueCountry) => (
                <option key={valueCountry.value} value={valueCountry.label}>
                  {valueCountry.label}
                </option>
              ))}
            </select>
            <label>phone</label>
            <div className="flex ">
              <select
                className="rounded-sm bg-[white] pl-[3px] h-[35px] w-[100%]"
                {...register("codephone")}
              >
                {options.map((valueCountry) => (
                  <option
                    key={valueCountry.value}
                    value={
                      valueCountry.iddcouyrty.root +
                      valueCountry.iddcouyrty.suffixes[0]
                    }
                  >
                    {valueCountry.iddcouyrty.root +
                      valueCountry.iddcouyrty.suffixes[0]}
                  </option>
                ))}
              </select>
              <input
                className="bg-[white] pl-[3px] h-[35px] w-[34%] w-[100%]"
                type="number"
                {...register("phone")}
              ></input>
            </div>
          </div>

          <button
            style={{
              color: "white",
              borderRadius: "11px",
            }}
            className=" bg-[cadetblue] relative w-[30%] h-[45px]  rounded-lg  shadow-lg shadow-indigo-500/50

   top-[16px]

"
            type="submit"
          >
            Sumbit
          </button>
        </form>
        <div
          id="valdtingthing"
          className="relative w-[50%]  h-[100%] flex flex-col gap-[20px] flex-wrep  p-[20px]"
        >
          <h3 className=" text-[25px] oswald-medium colorSing">Sing in</h3>
          <div id="reqguemnt" className="flex flex-col gap-[10px]">
            <h3>Requirements </h3>
            <ol
              type="I"
              className="list-disc text-wrap list-inside flex flex-col gap-[13px] 
"
            >
              <li>The password must not be less than 8 characters.</li>
              <li>
                The password must contain at least one lowercase letter, one
                uppercase letter, and one symbol.
              </li>
              <li>
                The username must contain at least one lowercase letter, one
                uppercase letter
              </li>
              <li>The email must end with @gmail.com</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
