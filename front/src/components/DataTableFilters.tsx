// front/src/components/DataTableFilters.tsx:
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// Assumindo que você está usando componentes Styled Components ou CSS classes para estilizar
// Vamos remover os divs com classes "controls-grid" e "control-group" E estilos inline.

// 💡 Nota: Você precisará importar e usar os Styled Components (ControlGroup, ControlLabel, etc.)
// OU garantir que eles sejam passados como props, ou que o estilo seja feito no pai.
// Para simplicidade, vou usar tags HTML padrão, esperando que o componente pai (SimaSPAPage)
// forneça os componentes Styled Components como wrappers.

interface Props {
  filters: any;
  setFilters: (f: any) => void;

  parametrosOptions: { value: string; label: string }[];
  // Se você precisa dos componentes Styled, eles seriam passados aqui
  ControlGroup: any;
  ControlLabel: any;
  ControlSelect: any;
  DateRangeInput: any;
}

export function DataTableFilters({
  filters,
  setFilters,

  parametrosOptions,
  // 💡 Assumindo que você passará os styled components como props
  ControlGroup,
  ControlLabel,
  ControlSelect,
  DateRangeInput,
}: Props) {
  // Use os componentes Styled Components que serão passados como Props (ou o HTML base)
  const CG = ControlGroup || "div";
  const CL = ControlLabel || "label";
  const CS = ControlSelect || "select";
  const DI = DateRangeInput || "input";

  return (
    // Removido o div controls-grid. O componente pai (SimaSPAPage) agora usará ControlsGrid
    <>
      {/* 2. Temperatura (Range de valores) */}
      <CG className="control-group">
        <CL>Temperatura (°C)</CL>
        {/* Use um div para agrupar os inputs min/max */}
        <div style={{ display: "flex", gap: "8px" }}>
          <DI
            type="number"
            placeholder="Min"
            value={filters.temperaturaMin ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, temperaturaMin: e.target.value || undefined })
            }
          />
          <DI
            type="number"
            placeholder="Max"
            value={filters.temperaturaMax ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, temperaturaMax: e.target.value || undefined })
            }
          />
        </div>
      </CG>

      {/* 3. pH (Range de valores) */}
      <CG className="control-group">
        <CL>pH</CL>
        <div style={{ display: "flex", gap: "8px" }}>
          <DI
            type="number"
            placeholder="Min"
            value={filters.phMin ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, phMin: e.target.value || undefined })
            }
          />
          <DI
            type="number"
            placeholder="Max"
            value={filters.phMax ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, phMax: e.target.value || undefined })
            }
          />
        </div>
      </CG>

      {/* 4. Tipo de parâmetro */}
      <CG className="control-group">
        <CL>Tipo de parâmetro</CL>
        <CS
          value={filters.tipoParametro ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilters({ ...filters, tipoParametro: e.target.value })
          }
        >
          <option value="">Todos</option>
          {parametrosOptions.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </CS>
      </CG>

      {/* 5. Busca textual */}
      <CG className="control-group">
        <CL>Busca Textual</CL>
        <DI
          type="text"
          placeholder="Buscar em todas as colunas..."
          value={filters.search ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
      </CG>
    </>
  );
}
