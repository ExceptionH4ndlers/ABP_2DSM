export class ExemploUso {
  static criarExemplos(): void {
    // Exemplo BALCAR
    const reservatorio = new Reservatorio(1, "Furnas", -20.5, -46.3);
    console.log(reservatorio.getReservatorio());

    // Exemplo Furnas
    const bolhas = new Bolhas(1, 1, 1, new Date(), "10:00", 5.0, 3, 100, 2.5, 8.0, 78.0, 1.2, 0.1);
    console.log(bolhas.getBolhas());

    // Exemplo SIMA
    const estacao = new Estacao("e1ea9", "e1ea9", "Balbina", -1.903697222, -59.46910833, new Date(), new Date());
    console.log(estacao.getEstacao());
  }
}
