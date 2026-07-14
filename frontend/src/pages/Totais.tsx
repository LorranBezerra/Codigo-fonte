import { useEffect, useState } from "react";
import api from "../services/api";

interface TotalPessoa {
  nome: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

interface TotaisResponse {
  pessoas: TotalPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}

export default function Totais() {
  const [dados, setDados] = useState<TotaisResponse>();

  async function carregarTotais() {
    const response = await api.get("/Totais");
    setDados(response.data);
  }

  useEffect(() => {
    carregarTotais();
  }, []);

  if (!dados) {
    return <h3>Carregando...</h3>;
  }

  return (
    <div className="container-fluid">

      <h2 className="mb-4">Resumo Financeiro</h2>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm border-success">
            <div className="card-body">
              <h6 className="text-success">Receitas</h6>
              <h3>
                {dados.totalReceitas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-danger">
            <div className="card-body">
              <h6 className="text-danger">Despesas</h6>
              <h3>
                {dados.totalDespesas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h6 className="text-primary">Saldo Geral</h6>
              <h3>
                {dados.saldoGeral.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm">

        <div className="card-header">
          <h4>Totais por Pessoa</h4>
        </div>

        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead>

              <tr>

                <th>Pessoa</th>

                <th>Receitas</th>

                <th>Despesas</th>

                <th>Saldo</th>

              </tr>

            </thead>

            <tbody>

              {dados.pessoas.map((pessoa) => (

                <tr key={pessoa.nome}>

                  <td>{pessoa.nome}</td>

                  <td className="text-success fw-bold">
                    {pessoa.receitas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="text-danger fw-bold">
                    {pessoa.despesas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td
                    className={`fw-bold ${
                      pessoa.saldo >= 0 ? "text-primary" : "text-danger"
                    }`}
                  >
                    {pessoa.saldo.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}