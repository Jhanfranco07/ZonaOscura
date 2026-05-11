"use client";

import { Input } from "@/components/ui/Input";
import { limaDistricts } from "@/lib/limaDistricts";

export function DistrictCombobox({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Input
        name="distrito"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        list="lima-districts"
        placeholder="Distrito (escribe: San, Ate, Lima...)"
        required
      />
      <datalist id="lima-districts">
        {limaDistricts.map((district) => (
          <option key={district} value={district} />
        ))}
      </datalist>
      <p className="mt-xs text-xs text-on-surface-variant">
        Usa distritos oficiales de Lima Metropolitana. Ejemplo: Pachacámac, Ate, Comas.
      </p>
    </div>
  );
}
