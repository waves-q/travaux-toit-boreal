// lib/schemas.ts
import { z } from "zod";

export const leadSchema = z.object({
  projectType: z.enum(["remplacement", "reparation", "nouvelle"]),
  material: z.enum(["bardeaux", "tole", "membrane"]),
  area: z.number().min(300).max(10000),
  slope: z.enum(["faible", "moyenne", "forte"]),
  demolition: z.boolean(),

  fullName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Courriel invalide"),
  phone: z.string().min(10, "Téléphone invalide"),
  city: z.string().min(2, "La ville est requise"),
  message: z.string().optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;