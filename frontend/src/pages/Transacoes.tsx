import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

interface Pessoa {
    id: number;
    nome: string;
}

interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    pessoaId: number;
    nomePessoa: string;
}

export default function Transacoes() {
    const [pesquisa, setPesquisa] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number>(0);
    const [tipo, setTipo] = useState(0);
    const [pessoaId, setPessoaId] = useState(0);

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    async function carregarPessoas() {
        const response = await api.get("/Pessoas");
        setPessoas(response.data);
    }

    async function carregarTransacoes() {
        const response = await api.get("/Transacoes");
        setTransacoes(response.data);
    }

    async function salvarTransacao() {
        try {
            await api.post("/Transacoes", {
                descricao,
                valor,
                tipo,
                pessoaId,
            });

            setDescricao("");
            setValor(0);
            setTipo(0);
            setPessoaId(0);

            carregarTransacoes();

            toast.success("Transação cadastrada com sucesso!");
        } catch (error: any) {
            alert(error.response?.data ?? "Erro ao cadastrar.");
        }
    }

    useEffect(() => {
        carregarPessoas();
        carregarTransacoes();
    }, []);

    return (
        <div className="container-fluid">

            <div className="row">

                <div className="col-lg-4">

                    <div className="card shadow-sm">

                        <div className="card-header">
                            <h4>Nova Transação</h4>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label>Pessoa</label>

                                <select
                                    className="form-select"
                                    value={pessoaId}
                                    onChange={(e) => setPessoaId(Number(e.target.value))}
                                >
                                    <option value={0}>Selecione...</option>

                                    {pessoas.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Descrição</label>

                                <input
                                    className="form-control"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Valor</label>

                                <input
                                    className="form-control"
                                    type="number"
                                    value={valor}
                                    onChange={(e) => setValor(Number(e.target.value))}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Tipo</label>

                                <select
                                    className="form-select"
                                    value={tipo}
                                    onChange={(e) => setTipo(Number(e.target.value))}
                                >
                                    <option value={0}>Receita</option>
                                    <option value={1}>Despesa</option>
                                </select>
                            </div>

                            <button
                                className="btn btn-success w-100"
                                onClick={salvarTransacao}
                            >
                                Salvar Transação
                            </button>

                        </div>

                    </div>

                </div>

                <div className="col-lg-8">

                    <div className="card shadow-sm">

                        <div className="card-header">
                            <h4>Transações Cadastradas</h4>
                        </div>

                        <div className="card-body">
                            <div className="mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Pesquisar descrição ou pessoa..."
                                    value={pesquisa}
                                    onChange={(e) => setPesquisa(e.target.value)}
                                />

                            </div>
                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>Pessoa</th>

                                        <th>Descrição</th>

                                        <th>Tipo</th>

                                        <th>Valor</th>

                                    </tr>

                                </thead>

                                    <tbody>

                                        {transacoes
                                            .filter(
                                                (t) =>
                                                    t.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ||
                                                    t.nomePessoa.toLowerCase().includes(pesquisa.toLowerCase())
                                            )
                                            .map((t) => (
                                                <tr key={t.id}>

                                                    <td>{t.nomePessoa}</td>

                                                    <td>{t.descricao}</td>

                                                    <td>
                                                        <span
                                                            className={`badge ${t.tipo === "Receita"
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                                }`}
                                                        >
                                                            {t.tipo}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {t.valor.toLocaleString("pt-BR", {
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

            </div>

        </div>
    );
}