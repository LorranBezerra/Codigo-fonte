import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props{

    receitas:number;

    despesas:number;

}

export default function GraficoFinanceiro({

    receitas,

    despesas

}:Props){

    const data={

        labels:["Receitas","Despesas"],

        datasets:[

            {

                label:"Valor",

                data:[receitas,despesas],

                backgroundColor:[

                    "#22c55e",

                    "#ef4444"

                ]

            }

        ]

    };

    return(

        <Bar

            data={data}

            options={{

                responsive:true,

                plugins:{

                    legend:{

                        display:false

                    }

                }

            }}

        />

    );

}