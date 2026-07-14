namespace HomeBudget.Api.DTOs
{
    public class TotaisResponseDTO
    {
        public List<TotalPessoaDTO> Pessoas { get; set; } = new();

        public decimal TotalReceitas { get; set; }

        public decimal TotalDespesas { get; set; }

        public decimal SaldoGeral { get; set; }
    }
}