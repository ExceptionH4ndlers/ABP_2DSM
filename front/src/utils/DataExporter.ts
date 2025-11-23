import * as XLSX from "xlsx";
import JSZip from "jszip";

export interface ExportOptions {
  filename: string;
  format: "csv" | "json" | "xlsx";
  filters?: Record<string, unknown>;
  formatter?: (item: Record<string, unknown>) => Record<string, unknown>;
  trackProgress?: (progress: number) => void;
}

export default class DataExporter {
  static applyFilters(data: Array<Record<string, unknown>>, filters?: Record<string, unknown>) {
    if (!filters) return data;

    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null) return true;
        return item[key] === value;
      }),
    );
  }

  static formatData(
    data: Array<Record<string, unknown>>,
    formatter?: (item: Record<string, unknown>) => Record<string, unknown>,
  ) {
    return formatter ? data.map(formatter) : data;
  }

  // Converts to CSV
  static toCSV(data: Array<Record<string, unknown>>) {
    const headers = Object.keys(data[0] || {});
    const csvRows = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")),
    ];

    return csvRows.join("\n");
  }

  // Converts to JSON
  static toJSON(data: Array<Record<string, unknown>>) {
    return JSON.stringify(data, null, 2);
  }

  // Converts to Excel
  static toExcel(data: Array<Record<string, unknown>>) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    return XLSX.write(wb, { bookType: "xlsx", type: "array" });
  }

  static downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * MAIN EXPORT FUNCTION
   */
  static async export(
    data: Array<Record<string, unknown>>,
    options: ExportOptions | ExportOptions[],
  ) {
    const isMultiple = Array.isArray(options);

    if (!isMultiple) {
      return this.exportSingle(data, options);
    }

    // Multiple → requires ZIP
    const zip = new JSZip();

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const file = await this.exportSingle(data, opt, true);
      if (file instanceof Blob) {
        zip.file(opt.filename, file);
      }

      opt.trackProgress?.(((i + 1) / options.length) * 100);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    this.downloadBlob(zipBlob, "export.zip");
  }

  /**
   * Export a single file
   */
  static async exportSingle(
    data: Array<Record<string, unknown>>,
    opt: ExportOptions,
    returnBlob = false,
  ): Promise<Blob | void> {
    let processed = this.applyFilters(data, opt.filters);
    processed = this.formatData(processed, opt.formatter);

    let blob: Blob;

    if (opt.format === "csv") {
      blob = new Blob([this.toCSV(processed)], { type: "text/csv" });
    } else if (opt.format === "json") {
      blob = new Blob([this.toJSON(processed)], { type: "application/json" });
    } else {
      const excelBuffer = this.toExcel(processed);
      blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
    }

    if (returnBlob) return blob;

    this.downloadBlob(blob, opt.filename);
  }
}
