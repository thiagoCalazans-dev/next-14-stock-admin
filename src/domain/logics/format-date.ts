export const formatDate = { toStringBrFormat };

function toStringBrFormat(date: Date): string | null {
  try {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = String(date.getFullYear());

    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return null;
  }
}
