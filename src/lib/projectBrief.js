import { z } from "zod";
import { CITIES, COUNTRIES, REQUIREMENTS, START_TIMES } from "./constants.js";

export const PROJECT_BRIEF_FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "country",
  "city",
  "requirements",
  "start_time",
  "budget",
  "message",
];

export const projectBriefSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address.").max(255, "Email is too long."),
  phone: z.string().trim().max(30, "Phone number is too long.").optional().or(z.literal(""))
    .refine((value) => !value || /^\+?[0-9\s()\-]{7,20}$/.test(value), { message: "Enter a valid phone number." }),
  company: z.string().trim().max(120, "Company name is too long.").optional().or(z.literal("")),
  country: z.enum(COUNTRIES, { errorMap: () => ({ message: "Please select a country." }) }),
  city: z.enum(CITIES, { errorMap: () => ({ message: "Please select a city or region." }) }),
  requirements: z.enum(REQUIREMENTS, { errorMap: () => ({ message: "Please choose a requirement." }) }),
  start_time: z.enum(START_TIMES, { errorMap: () => ({ message: "Please select when you want to start." }) }),
  budget: z.string().trim().min(1, "Please enter your approximate budget.").max(80, "Budget is too long."),
  message: z.string().trim().min(10, "Please add at least 10 characters so we can understand your project.").max(1200, "Message is too long."),
});

export function readProjectBrief(form) {
  const data = new FormData(form);
  return Object.fromEntries(PROJECT_BRIEF_FIELDS.map((field) => [field, String(data.get(field) || "")]));
}