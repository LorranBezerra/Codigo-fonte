using HomeBudget.Api.Data;
using HomeBudget.Api.DTOs;
using HomeBudget.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TotaisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TotaisController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<TotaisResponseDTO>> Consultar()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var resultado = new TotaisResponseDTO();

            foreach (var pessoa in pessoas)
            {
                var receitas = pessoa.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                var despesas = pessoa.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                resultado.Pessoas.Add(new TotalPessoaDTO
                {
                    Nome = pessoa.Nome,
                    Receitas = receitas,
                    Despesas = despesas,
                    Saldo = receitas - despesas
                });

                resultado.TotalReceitas += receitas;
                resultado.TotalDespesas += despesas;
            }

            resultado.SaldoGeral =
                resultado.TotalReceitas - resultado.TotalDespesas;

            return Ok(resultado);
        }
    }
}