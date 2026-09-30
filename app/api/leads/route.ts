// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";
import { calculateEstimate } from "@/lib/calculate";

export async function POST(request: Request) {
  // 1. Parse
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 }
    );
  }

  // 2. Validation serveur
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Données invalides.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // 3. Recalcul serveur — on ne fait jamais confiance au client
  const estimate = calculateEstimate({
    projectType: data.projectType,
    material: data.material,
    area: data.area,
    slope: data.slope,
    demolition: data.demolition,
  });

  const lead = {
    ...data,
    estimate,
    submittedAt: new Date().toISOString(),
  };

  // 4. Envoi au webhook (simule le CRM)
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("WEBHOOK_URL manquant dans les variables d'environnement");
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 500 }
    );
  }

  try {
    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!webhookRes.ok) {
      throw new Error(`Webhook a répondu ${webhookRes.status}`);
    }
  } catch (err) {
    console.error("Erreur webhook:", err);
    return NextResponse.json(
      {
        error:
          "Impossible de transmettre votre demande pour le moment. Veuillez réessayer dans quelques instants.",
      },
      { status: 502 }
    );
  }

  // 5. Succès
  return NextResponse.json({ ok: true, estimate }, { status: 200 });
}