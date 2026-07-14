namespace HomeBudget.Api.DTOs
{
    public class TransacaoCreateDTO
    {
        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public int Tipo { get; set; }

        public int PessoaId { get; set; }
    }
}