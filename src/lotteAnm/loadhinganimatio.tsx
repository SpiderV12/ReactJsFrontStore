import Lottie from "lottie-react";
import lodngJson from "../assets/XCDLR9YF8y.json";

export default function Lodinganimatio() {
  return (
    <Lottie
      animationData={lodngJson}
      loop={true}
      style={{ width: 200, height: 200 }}
    ></Lottie>
  );
}
