import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemalogin } from "../schema/lognschema";
export type UseFormtype = z.infer<typeof schemalogin>;
