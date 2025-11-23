interface Option {
  label: string;
  value: string;
}

export interface Filters {
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
  reservatorios: string[];
  instituicao: string;
  nivelMin: string;
  nivelMax: string;
  volumeUtilMin: string;
  volumeUtilMax: string;
  geracaoMin: string;
  geracaoMax: string;
  sortBy: string;
  sortOrder: string;
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;

  reservatoriosOptions: Option[];
  instituicoesOptions: Option[];

  onApply: () => void;
}

export function DataTableFiltersFurnas({
  filters,
  setFilters,
  reservatoriosOptions,
  instituicoesOptions,
  onApply,
}: Props) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Intervalo de datas */}
      <div>
        <label>Data inicial</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />

        <label style={{ marginLeft: 12 }}>Data final</label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      {/* Reservatórios múltiplos */}
      <div>
        <label>Reservatórios</label>
        <select
          multiple
          value={filters.reservatorios}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
            setFilters({ ...filters, reservatorios: values });
          }}
        >
          {reservatoriosOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Instituição */}
      <div>
        <label>Instituição</label>
        <select
          value={filters.instituicao}
          onChange={(e) => setFilters({ ...filters, instituicao: e.target.value })}
        >
          <option value="">Todas</option>
          {instituicoesOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Ranges */}
      <div>
        <label>Nível (mín – máx)</label>
        <div>
          <input
            type="number"
            placeholder="Min"
            value={filters.nivelMin ?? ""}
            onChange={(e) => setFilters({ ...filters, nivelMin: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            style={{ marginLeft: 8 }}
            value={filters.nivelMax ?? ""}
            onChange={(e) => setFilters({ ...filters, nivelMax: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label>Volume Útil (mín – máx)</label>
        <div>
          <input
            type="number"
            placeholder="Min"
            value={filters.volumeUtilMin ?? ""}
            onChange={(e) => setFilters({ ...filters, volumeUtilMin: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            style={{ marginLeft: 8 }}
            value={filters.volumeUtilMax ?? ""}
            onChange={(e) => setFilters({ ...filters, volumeUtilMax: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label>Geração (mín – máx)</label>
        <div>
          <input
            type="number"
            placeholder="Min"
            value={filters.geracaoMin ?? ""}
            onChange={(e) => setFilters({ ...filters, geracaoMin: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            style={{ marginLeft: 8 }}
            value={filters.geracaoMax ?? ""}
            onChange={(e) => setFilters({ ...filters, geracaoMax: e.target.value })}
          />
        </div>
      </div>

      {/* Ordenação */}
      <div>
        <label>Ordenar por</label>
        <input
          type="text"
          placeholder="ex: data,geracao,nivel"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        />

        <select
          style={{ marginLeft: 8 }}
          value={filters.sortOrder}
          onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>

      <button onClick={onApply}>Aplicar Filtros</button>
    </div>
  );
}
