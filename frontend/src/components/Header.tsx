import "../styles/Header.css";

export default function Header() {

    const hoje = new Date();

    return (

        <header className="header">

            <div>

                <h2>Home Budget</h2>

                <small>

                    {hoje.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}

                </small>

            </div>

            <div className="user">

                <span>👤 Lorran Rodrigues</span>

            </div>

        </header>

    );

}