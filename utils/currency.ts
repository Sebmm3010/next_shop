export const format = (value: number) => {
  // Formateador
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};

export const pesosToDollar = (pesos: number): number => {
  const dollar = pesos / Number(process.env.NEXT_DOLAR_EXCHANGE_RATE);
  return Math.round(dollar * 100) / 100;
};
