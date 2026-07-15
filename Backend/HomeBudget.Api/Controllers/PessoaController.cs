using HomeBudget.Api.Data;
using HomeBudget.Api.DTOs;
using HomeBudget.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> Listar()
        {
           var pessoas = await _context.Pessoas
           
    .Select(p => new PessoaResponseDTO
         {
           Id = p.Id,
          Nome = p.Nome,
          Idade = p.Idade
         })

      .ToListAsync(); // Lista todas as pessoas cadastradas.

return Ok(pessoas);
        }

        // POST: api/pessoas
        [HttpPost]
public async Task<ActionResult<PessoaResponseDTO>> Criar(PessoaCreateDTO dto)
{
    var pessoa = new Pessoa
    {
        Nome = dto.Nome,
        Idade = dto.Idade
    };

    // Validações de negócio
    if (string.IsNullOrWhiteSpace(pessoa.Nome))
    {
        return BadRequest("O nome é obrigatório.");
    }

    if (pessoa.Nome.Length < 3)
    {
        return BadRequest("O nome deve possuir pelo menos 3 caracteres.");
    }

    if (pessoa.Idade < 0)
    {
        return BadRequest("A idade não pode ser negativa.");
    }

    // Salva no banco
    _context.Pessoas.Add(pessoa); // Cadastra uma nova pessoa.
    await _context.SaveChangesAsync();

    // Agora o Id já foi gerado pelo banco
    var response = new PessoaResponseDTO
    {
        Id = pessoa.Id,
        Nome = pessoa.Nome,
        Idade = pessoa.Idade
    };

    return Ok(response);
}
       
        // DELETE: api/pessoas/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
                return NotFound("Pessoa não encontrada.");

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
// Remove uma pessoa e, devido ao Cascade Delete,
// suas transações também serão excluídas.
            return NoContent();
        }
    }
}