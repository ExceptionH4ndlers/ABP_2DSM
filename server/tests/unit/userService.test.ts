import { Request, Response } from "express";
import { getAllSimple } from "../../src/controllers/sima/estacao.controller"; // ajuste o caminho real
import { queryWithRetry } from "../../src/utils/db";
import { logger } from "../../src/utils/logger";

// 🔹 Mock das dependências externas
jest.mock("../../src/utils/db", () => ({
  queryWithRetry: jest.fn(),
}));

jest.mock("../../src/utils/logger", () => ({
  logger: { error: jest.fn() },
}));

describe("getAllSimple", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {}; // sem params
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("deve retornar lista de estações com sucesso (200)", async () => {
    // simula retorno do banco
    (queryWithRetry as jest.Mock).mockResolvedValueOnce({
      rows: [
        { idestacao: 1, rotulo: "Estação A" },
        { idestacao: 2, rotulo: "Estação B" },
      ],
    });

    await getAllSimple(req as Request, res as Response);

    expect(queryWithRetry).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [
        { idestacao: 1, rotulo: "Estação A" },
        { idestacao: 2, rotulo: "Estação B" },
      ],
    });
  });

  it("deve retornar erro 500 se a consulta falhar", async () => {
    (queryWithRetry as jest.Mock).mockRejectedValueOnce(
      new Error("Falha no banco"),
    );

    await getAllSimple(req as Request, res as Response);

    expect(logger.error).toHaveBeenCalledWith(
      "Erro ao consultar tbestacao simples",
      expect.objectContaining({
        message: "Falha no banco",
      })
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Erro interno ao consultar as estações.",
    });
  });
});
