//using HomeBudget.Api.Data;
using HomeBudget.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Api.Data
{// Contexto responsável pela comunicação com o banco de dados.
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }

        public DbSet<Transacao> Transacoes { get; set; }
// Configura o relacionamento entre Pessoa e Transação.
// Quando uma pessoa é excluída, todas as transações
// associadas também são removidas automaticamente.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}