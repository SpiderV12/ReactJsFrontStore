import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Singinschema = z.object({
  username: z
    .string()
    .max(10)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, "not valid username look Requirements"),
  pass: z
    .string()
    .max(20, "worng password ")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "not valid pass look Requirements"
    ),
  email: z
    .string()
    .max(30, "worng  Email")
    .email("not valid email look Requirements")
    .regex(/^.*@gmail\.com$/, "Email"),
  age: z.number(),

  Country: z.string(),
  codephone: z.string(),
  phone: z.string().max(13),
});
