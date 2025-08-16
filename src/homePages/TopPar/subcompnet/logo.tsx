import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function LogoComponet() {
  return (
    <Link
      className="uppercase  h-[30px] 
   text-[18px]  oswald-medium"
      to="/home"
      style={{ textDecoration: "none", color: "#303150" }}
    >
      UltarStore
    </Link>
  );
}
