using HomeBudget.Api.Data;
using HomeBudget.Api.DTOs;
using HomeBudget.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/transacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> Listar()
        {
            var transacoes = await _context.Transacoes
    .Include(t => t.Pessoa)
    .Select(t => new TransacaoResponseDTO
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            Tipo = t.Tipo.ToString(),
            PessoaId = t.PessoaId,
            NomePessoa = t.Pessoa!.Nome
         })
         
    .ToListAsync();

return Ok(transacoes);
        }

        // POST: api/transacoes
        [HttpPost]
        public async Task<ActionResult> Criar(TransacaoCreateDTO dto)
        {
            var transacao = new Transacao
            {
               Descricao = dto.Descricao,
              Valor = dto.Valor,
              Tipo = (TipoTransacao)dto.Tipo,
             PessoaId = dto.PessoaId
            };

            
            if (string.IsNullOrWhiteSpace(transacao.Descricao))
            {
                   return BadRequest("A descrição é obrigatória.");
            }

            if (transacao.Valor <= 0)
            {
                  return BadRequest("O valor deve ser maior que zero.");
            }

            // Verifica se a pessoa existe
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);

            if (pessoa == null)
                return NotFound("Pessoa não encontrada.");

            // Regra de negócio:
            // Menores de idade só podem cadastrar despesas.
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            {
                return BadRequest("Pessoas menores de idade só podem cadastrar despesas.");
            }

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return Ok(transacao);
        }
    }
}