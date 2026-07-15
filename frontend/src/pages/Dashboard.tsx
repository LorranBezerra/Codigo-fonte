

import { useEffect, useState } from "react";

import api from "../services/api"; // Carrega todas as informações exibidas no Dashboard.

import CardResumo from "../components/CardResumo";

import GraficoFinanceiro from "../components/GraficoFinanceiro";



interface TotalPessoa {

    nome: string;

    receitas: number;

    despesas: number;

    saldo: number;

}

interface Totais {

    pessoas: TotalPessoa[];

    totalReceitas: number;

    totalDespesas: number;

    saldoGeral: number;

}

interface Pessoa {

    id: number;

    nome: string;

    idade: number;

}

interface Transacao {

    id: number;

    nomePessoa: string;

    descricao: string;

    tipo: string;

    valor: number;

}

export default function Dashboard() {

    const [totais, setTotais] = useState<Totais>();

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    async function carregar() {

        const totaisResponse = await api.get("/Totais");

        const pessoasResponse = await api.get("/Pessoas");

        const transacoesResponse = await api.get("/Transacoes");


        setTotais(totaisResponse.data);

        setPessoas(pessoasResponse.data);

        setTransacoes(transacoesResponse.data);
    }

    useEffect(() => {

        carregar();

    }, []);

    if (!totais) {

        return <h3>Carregando...</h3>

    }

    return (

        <>

            <h2 className="mb-4">

                Dashboard

            </h2>

            <div className="row g-4">

                <div className="col-md-3">

                    <CardResumo

                        titulo="Receitas"

                        valor={totais.totalReceitas.toLocaleString("pt-BR", {

                            style: "currency",

                            currency: "BRL"

                        })}

                    />

                </div>

                <div className="col-md-3">

                    <CardResumo

                        titulo="Despesas"

                        valor={totais.totalDespesas.toLocaleString("pt-BR", {

                            style: "currency",

                            currency: "BRL"

                        })}

                    />

                </div>

                <div className="col-md-3">

                    <CardResumo

                        titulo="Saldo"

                        valor={totais.saldoGeral.toLocaleString("pt-BR", {

                            style: "currency",

                            currency: "BRL"

                        })}

                    />

                </div>

                <div className="col-md-3">

                    <CardResumo

                        titulo="Pessoas"

                        valor={String(pessoas.length)}

                    />

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-7">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            <h5>Últimas Transações</h5>

                        </div>

                        <div className="card-body">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>Pessoa</th>

                                        <th>Descrição</th>

                                        <th>Tipo</th>

                                        <th>Valor</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        transacoes.slice(0, 5).map(t => (

                                            <tr key={t.id}>

                                                <td>{t.nomePessoa}</td>

                                                <td>{t.descricao}</td>

                                                <td>

                                                    <span className={

                                                        t.tipo === "Receita"

                                                            ?

                                                            "badge bg-success"

                                                            :

                                                            "badge bg-danger"

                                                    }>

                                                        {t.tipo}

                                                    </span>

                                                </td>

                                                <td>

                                                    {t.valor.toLocaleString("pt-BR", {

                                                        style: "currency",

                                                        currency: "BRL"

                                                    })}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>
                            

                        </div>

                    </div>

                </div>

                <div className="col-lg-5">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            <h5>Totais por Pessoa</h5>

                        </div>

                        <div className="card-body">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>Pessoa</th>

                                        <th>Saldo</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        totais.pessoas.map(p => (

                                            <tr key={p.nome}>

                                                <td>

                                                    {p.nome}

                                                </td>

                                                <td>

                                                    {

                                                        p.saldo.toLocaleString("pt-BR", {

                                                            style: "currency",

                                                            currency: "BRL"

                                                        })

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
<div className="row mt-4">

    <div className="col-lg-12">

        <div className="card shadow-sm">

            <div className="card-header">

                <h5>Receitas x Despesas</h5>

            </div>

            <div className="card-body">

                <GraficoFinanceiro

                    receitas={totais.totalReceitas}

                    despesas={totais.totalDespesas}

                />

            </div>

        </div>

    </div>

</div>
            </div>




        </>

    );

}