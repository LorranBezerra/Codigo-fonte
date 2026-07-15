import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

import { FaHome, FaUsers, FaMoneyBillWave, FaChartPie } from "react-icons/fa";

export default function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <img
                    src="/Group 579.png"
                    alt="Home Budget"
                />

                <h3>Controle Finaceiro</h3>

            </div>

            <nav>

                <NavLink to="/" end>
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/pessoas">
                    <FaUsers />
                    <span>Pessoas</span>
                </NavLink>

                <NavLink to="/transacoes">
                    <FaMoneyBillWave />
                    <span>Transações</span>
                </NavLink>

                <NavLink to="/totais">
                    <FaChartPie />
                    <span>Totais</span>
                </NavLink>

            </nav>

        </aside>

    );

}