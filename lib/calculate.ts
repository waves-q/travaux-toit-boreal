// lib/calculate.ts

export type ProjectType = "remplacement" | "reparation" | "nouvelle";
export type Material = "bardeaux" | "tole" | "membrane";
export type Slope = "faible" | "moyenne" | "forte";

export type EstimateInput = {
  projectType: ProjectType;
  material: Material;
  area: number;
  slope: Slope;
  demolition: boolean;
};

export type EstimateResult = {
  subtotal: number;
  rangeMin: number;
  rangeMax: number;
  tps: number;
  tvq: number;
  total: number;
};

const MATERIAL_RATES: Record<Material, number> = {
  bardeaux: 6.5,
  tole: 11,
  membrane: 9,
};

const SLOPE_MULTIPLIERS: Record<Slope, number> = {
  faible: 1.0,
  moyenne: 1.15,
  forte: 1.35,
};

const PROJECT_FACTORS: Record<ProjectType, number> = {
  remplacement: 1.0,
  reparation: 0.35,
  nouvelle: 0.9,
};

const MIN_SUBTOTAL = 750;
const DEMOLITION_RATE = 1.75;
const TPS_RATE = 0.05;
const TVQ_RATE = 0.09975;

const round = (n: number) => Math.round(n * 100) / 100;

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const { projectType, material, area, slope, demolition } = input;

  const base = area * MATERIAL_RATES[material] * SLOPE_MULTIPLIERS[slope];
  const demolitionCost =
    demolition && projectType === "remplacement" ? area * DEMOLITION_RATE : 0;

  let subtotal = (base + demolitionCost) * PROJECT_FACTORS[projectType];
  if (subtotal < MIN_SUBTOTAL) subtotal = MIN_SUBTOTAL;

  const rangeMin = round(subtotal * 0.9);
  const rangeMax = round(subtotal * 1.1);
  const tps = round(subtotal * TPS_RATE);
  const tvq = round(subtotal * TVQ_RATE);
  const total = round(subtotal + tps + tvq);

  return {
    subtotal: round(subtotal),
    rangeMin,
    rangeMax,
    tps,
    tvq,
    total,
  };
}