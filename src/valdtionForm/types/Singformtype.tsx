import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Singinschema } from "../schema/Snginschema";
export type UseSingFormtype = z.infer<typeof Singinschema>;
