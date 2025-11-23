import * as XLSX from "xlsx";
import JSZip from "jszip";

export interface ExportOptions {
  filename: string;
  format: "csv" | "json" | "xlsx";
  filters?: Record<string, any>;
  formatter?: (item: any) => any;
  trackProgress?: (progress: number) => void;
}

export default class DataExporter {
  static applyFilters(data: any[], filters?: Record<string, any>) {
    if (!filters) return data;

    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null) return true;
        return item[key] === value;
      })
    );
  }

  static formatData(data: any[], formatter?: (item: any) => any) {
    return formatter ? data.map(formatter) : data;
  }

  static toCSV(data: any[]) {
    const headers = Object.keys(data[0] || {});
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ];
    return csvRows.join("\n");
  }

  static toJSON(data: any[]) {
    return JSON.stringify(data, null, 2);
  }

  static toExcel(data: any[]) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    return XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  }

  /**
   * MAIN EXPORT
   */
  static async export(
    data: any[],
    options: ExportOptions | ExportOptions[]
  ): Promise<Buffer | JSZip> {
    const isMultiple = Array.isArray(options);

    if (!isMultiple) {
      return this.exportSingle(data, options);
    }

    const zip = new JSZip();

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const fileBuffer = await this.exportSingle(data, opt);

      zip.file(opt.filename, fileBuffer);
      opt.trackProgress?.(((i + 1) / options.length) * 100);
    }

    return zip;
  }

  static async exportSingle(data: any[], opt: ExportOptions) {
    let processed = this.applyFilters(data, opt.filters);
    processed = this.formatData(processed, opt.formatter);

    if (opt.format === "csv") {
      return Buffer.from(this.toCSV(processed), "utf-8");
    }

    if (opt.format === "json") {
      return Buffer.from(this.toJSON(processed), "utf-8");
    }

    return this.toExcel(processed);
  }
}
