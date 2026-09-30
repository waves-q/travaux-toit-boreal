"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type LeadsFilterProps = {
  currentType: string;
};

export function LeadsFilter({ currentType }: LeadsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "tous") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Select value={currentType} onValueChange={handleChange}>
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="Type de projet" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tous">Tous les types</SelectItem>
        <SelectItem value="remplacement">Remplacement</SelectItem>
        <SelectItem value="reparation">Réparation</SelectItem>
        <SelectItem value="nouvelle">Nouvelle construction</SelectItem>
      </SelectContent>
    </Select>
  );
}