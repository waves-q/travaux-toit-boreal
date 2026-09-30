import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Lead = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  projectType: "remplacement" | "reparation" | "nouvelle";
  material: string;
  area: number;
  total: number;
  submittedAt: string;
};

const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    fullName: "Marie Tremblay",
    email: "marie@exemple.com",
    phone: "514 555-1234",
    city: "Terrebonne",
    projectType: "remplacement",
    material: "Bardeaux d'asphalte",
    area: 1500,
    total: 15909.67,
    submittedAt: "2026-06-12T14:32:00Z",
  },
  {
    id: "2",
    fullName: "Luc Bergeron",
    email: "luc.bergeron@exemple.com",
    phone: "450 555-9876",
    city: "Blainville",
    projectType: "reparation",
    material: "Tôle",
    area: 800,
    total: 3371.06,
    submittedAt: "2026-06-11T09:15:00Z",
  },
  {
    id: "3",
    fullName: "Sophie Gagnon",
    email: "sophie@exemple.com",
    phone: "438 555-0101",
    city: "Laval",
    projectType: "nouvelle",
    material: "Membrane élastomère",
    area: 3200,
    total: 34421.34,
    submittedAt: "2026-06-10T17:48:00Z",
  },
];

const PROJECT_LABELS: Record<Lead["projectType"], string> = {
  remplacement: "Remplacement",
  reparation: "Réparation",
  nouvelle: "Nouvelle",
};

const format = (n: number) =>
  new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(n);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));

export default function AdminLeadsPage() {
  return (
    <main className="min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Leads reçus</h1>
          <p className="text-muted-foreground text-sm">
            Soumissions reçues via l&apos;estimateur en ligne.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste</CardTitle>
            <CardDescription>
              {MOCK_LEADS.length} lead{MOCK_LEADS.length > 1 ? "s" : ""} au total
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Filtres */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Select defaultValue="tous">
                <SelectTrigger className="sm:w-[200px]">
                  <SelectValue placeholder="Type de projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les types</SelectItem>
                  <SelectItem value="remplacement">Remplacement</SelectItem>
                  <SelectItem value="reparation">Réparation</SelectItem>
                  <SelectItem value="nouvelle">Nouvelle construction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tableau */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Reçu le</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_LEADS.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.fullName}</TableCell>
                      <TableCell>
                        <div className="text-sm">{lead.email}</div>
                        <div className="text-muted-foreground text-xs">{lead.phone}</div>
                      </TableCell>
                      <TableCell>{lead.city}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{PROJECT_LABELS[lead.projectType]}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {format(lead.total)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(lead.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}