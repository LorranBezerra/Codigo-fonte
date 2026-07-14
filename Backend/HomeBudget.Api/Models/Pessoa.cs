namespace HomeBudget.Api.Models
{
    public class Pessoa
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public int Idade { get; set; }

        // Uma pessoa pode ter várias transações
        public List<Transacao> Transacoes { get; set; } = new();
    }
}