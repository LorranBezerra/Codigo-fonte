namespace HomeBudget.Api.Models
{
    public class Transacao
    {
        public int Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public TipoTransacao Tipo { get; set; }

        // Chave estrangeira
        public int PessoaId { get; set; }

        // Navegação
        public Pessoa? Pessoa { get; set; }
    }
}