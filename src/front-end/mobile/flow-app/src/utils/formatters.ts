// Formata um número puro para o padrão brasileiro de exibição (ex: 1500.5 -> "1.500,50")
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Função auxiliar específica para Inputs de valor monetário
export function parseCurrencyInput(text: string) {
  const numericValue = text.replace(/\D/g, "");
  const amount = Number(numericValue) / 100;
  const display = formatCurrency(amount);

  return {
    amount,
    display
  };
}