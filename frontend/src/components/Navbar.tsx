import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ padding: 20 }}>
            <Link to="/">Pessoas</Link>{" | "}
            <Link to="/transacoes">Transações</Link>{" | "}
            <Link to="/totais">Totais</Link>
        </nav>
    );
}