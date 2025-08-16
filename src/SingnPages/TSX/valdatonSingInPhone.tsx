import bgImagesing from "../../assets/singphota.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../SateRedux/Store";
import type { verfyingPhone } from "../../model/ValdtingSinginPhone";
import axios from "axios";
import Reimgae from "../../../public/Picture/repass2.png";

export default function ValdtingSingIn() {
  const UserinfoState = useSelector((state: RootState) => state.userinfo);
  const [inputsCodephone, setInputsP] = useState({
    Pd1: "",
    Pd2: "",
    Pd3: "",
    Pd4: "",
    Pd5: "",
    Pd6: "",
  });
  const [inputsCodeemail, setInputsE] = useState({
    Ed1: "",
    Ed2: "",
    Ed3: "",
    Ed4: "",
    Ed5: "",
    Ed6: "",
  });
  return (
    <div
      id="holePage"
      className="h-[100vh] relative"
      style={{
        backgroundImage: `url(${Reimgae})`,
      }}
    >
      <div
        className="h-[70%] gap-[4%] fill-white drop-shadow-xl/50  p-[2%] rounded-lg flex flex-col  w-[90%] sm:w-[50%] absolute left-1/2 translate-x-[-50%] translate-y-[-50%] transform top-[50%] justify-evenly"
        style={{
          backgroundColor: "ghostwhite",
        }}
      >
        <h3
          className="h-[15%] text-center text-[25px] oswald-medium text-[#2d2937] font-extrabold
"
        >
          Verifying Phone and Email
        </h3>
        <div
          id="valdting phone "
          className="flex flex-col h-[30%] gap-[20%] text-center text-[23px] oswald-medium
"
        >
          <h3 className="font-[math] text-[#2d2937]  font-extrabold">
            Enter phone code
          </h3>
          <div
            id="inputsphnecode"
            className="flex flex-row     justify-center gap-[6px]"
          >
            <input
              maxLength={1}
              className="inputs_style"
              id="Pd1"
              value={inputsCodephone.Pd1}
              onChange={(eve) => {
                setInputsP((prev) => ({ ...prev, Pd1: eve.target.value }));
              }}
            ></input>
            <input
              maxLength={1}
              className="inputs_style"
              id="Pd2"
              onChange={(eve) => {
                setInputsP((prev) => ({ ...prev, Pd2: eve.target.value }));
              }}
            ></input>
            <input
              maxLength={1}
              className="inputs_style"
              id="Pd3"
              onChange={(eve) => {
                setInputsP((prev) => ({ ...prev, Pd3: eve.target.value }));
              }}
            ></input>
            <input
              maxLength={1}
              className="inputs_style"
              id="Pd4"
              onChange={(eve) => {
                setInputsP((prev) => ({ ...prev, Pd4: eve.target.value }));
              }}
            ></input>
            <input
              maxLength={1}
              className="inputs_style"
              id="Pd5"
              onChange={(eve) => {
                setInputsP((prev) => ({ ...prev, Pd5: eve.target.value }));
              }}
            ></input>
            <input
              maxLength={1}
              className="inputs_style"
              id="Pd6"
              onChange={(eve) => {
                setInputsP((prev) => ({ ...prev, Pd6: eve.target.value }));
              }}
            ></input>
          </div>
          <button className="font-[serif] text-[19px]   underline text-cyan-900 cursor-pointer">
            Re-sending code
          </button>
        </div>

        <form>
          <button
            className="  h-[50px] rounded-md   text-[#2d2937] w-[17%] h-[12%] relative left-1/2 translate-x-[-50%]  transform inset-ring-2 inset-ring-[#003c7185] 
          fill-indigo-500 drop-shadow-lg drop-shadow-sky-200
          "
            type="submit"
            style={{
              backgroundColor: "ghostwhite",
            }}
            onClick={(evnt) => {
              console.log("srtrsendcode phone ");
              evnt.preventDefault();
              const verfyinobject: verfyingPhone = {
                phone: UserinfoState.phone,
                code:
                  inputsCodephone.Pd1 +
                  inputsCodephone.Pd2 +
                  inputsCodephone.Pd3 +
                  inputsCodephone.Pd4 +
                  inputsCodephone.Pd5 +
                  inputsCodephone.Pd6,
                username: UserinfoState.username,
              };
              console.log("object sent to sva;d code phone:" + verfyinobject);
              console.log("code sendng:" + verfyinobject.code);
              axios
                .post(
                  "http://localhost:5216/api/SingInprocess/Register/GenOTP/isValid",
                  verfyinobject
                )
                .then((resonse) => {
                  if (resonse.data == true) {
                    console.log("is valid:" + resonse.data);
                  }
                  axios
                    .post(
                      "http://localhost:5216/api/SingInprocess/Register/GenlinkverfyngEmail",
                      {},
                      {
                        params: { username: UserinfoState.username },
                      }
                    )
                    .then((rsonse) => {
                      if (rsonse.data == true) {
                        window.alert(
                          "the link of vaadtnf email is senndng to your emal"
                        );
                      }
                    })
                    .catch((error) => {
                      console.log("thers err:" + error);
                    });
                })
                .catch((Erro) => {
                  console.log("ERRO:" + Erro);
                });
            }}
          >
            Sumbit
          </button>
        </form>
      </div>
    </div>
  );
}
