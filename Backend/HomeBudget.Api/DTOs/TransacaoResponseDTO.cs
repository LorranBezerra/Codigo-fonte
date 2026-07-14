namespace HomeBudget.Api.DTOs
{
    public class TransacaoResponseDTO
    {
        public int Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public string Tipo { get; set; } = string.Empty;

        public int PessoaId { get; set; }

        public string NomePessoa { get; set; } = string.Empty;
    }
}