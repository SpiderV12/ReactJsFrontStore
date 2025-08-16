import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export const schemalogin = z.object({
  email: z
    .string()
    .max(30, "worng  Email")
    .email("not valid email look Requirements")
    .regex(/^.+@gmail\.com$/, "Email"),
  pass: z
    .string()
    .max(20, "worng password ")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "not valid pass look Requirements"
    ),
});
