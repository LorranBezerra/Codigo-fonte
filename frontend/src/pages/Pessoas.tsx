import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

export default function Pessoas() {

    const [pesquisa, setPesquisa] = useState("");

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const [nome, setNome] = useState("");

    const [idade, setIdade] = useState(0);
    

    async function carregarPessoas() {
// Busca todas as pessoas cadastradas na API.
        const response = await api.get("/Pessoas");

        setPessoas(response.data);

    }

    async function salvarPessoa() {
// Envia uma nova pessoa para o backend.
        try {

            await api.post("/Pessoas", {

                nome,

                idade

            });

            setNome("");

            setIdade(0);

            carregarPessoas();
            toast.success("Pessoa cadastrada com sucesso!");

        }

        catch (error: any) {

            toast.error(error.response?.data ?? "Erro ao cadastrar.");

        }

    }

    async function excluir(id: number) {
// Remove uma pessoa após confirmação do usuário.
        const result = await Swal.fire({

            title: "Excluir pessoa?",

            text: "Todas as transações dessa pessoa também serão removidas.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Excluir",

            cancelButtonText: "Cancelar",

            confirmButtonColor: "#dc3545"

        });

        if (!result.isConfirmed)
            return;
        toast.success("Pessoa excluída com sucesso!");

        await api.delete(`/Pessoas/${id}`);

        carregarPessoas();

    }

    useEffect(() => {

        carregarPessoas();

    }, []);

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-lg-4">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            <h4>

                                Nova Pessoa

                            </h4>

                        </div>

                        <div className="card-body">

                            <div className="mb-3">

                                <label>

                                    Nome

                                </label>

                                <input

                                    className="form-control"

                                    value={nome}

                                    onChange={(e) => setNome(e.target.value)}

                                />

                            </div>

                            <div className="mb-3">

                                <label>

                                    Idade

                                </label>

                                <input

                                    className="form-control"

                                    type="number"

                                    value={idade}

                                    onChange={(e) =>

                                        setIdade(Number(e.target.value))

                                    }

                                />

                            </div>

                            <button

                                className="btn btn-primary w-100"

                                onClick={salvarPessoa}

                            >

                                Salvar Pessoa

                            </button>

                        </div>

                    </div>

                </div>

                <div className="col-lg-8">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            <h4>

                                Pessoas Cadastradas

                            </h4>

                        </div>

                        <div className="card-body">
                            <div className="mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Pesquisar pessoa..."
                                    value={pesquisa}
                                    onChange={(e) => setPesquisa(e.target.value)}
                                />

                            </div>
                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Nome</th>

                                        <th>Idade</th>

                                        <th></th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        pessoas
                                            .filter((p) =>
                                                p.nome.toLowerCase().includes(pesquisa.toLowerCase())
                                            )
                                            .map((p) => (

                                                <tr key={p.id}>

                                                    <td>

                                                        {p.id}

                                                    </td>

                                                    <td>

                                                        {p.nome}

                                                    </td>

                                                    <td>

                                                        {p.idade}

                                                    </td>

                                                    <td>

                                                        <button

                                                            className="btn btn-danger btn-sm"

                                                            onClick={() => excluir(p.id)}

                                                        >

                                                            Excluir

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}