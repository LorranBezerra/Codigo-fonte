

interface Props{

    titulo:string;

    valor:string;

 

}

export default function CardResumo({

    titulo,

    valor,

    

}:Props){

    return(

        <div className="card shadow-sm">

            <div className="card-body d-flex justify-content-between align-items-center">

                <div>

                    <small className="text-secondary">

                        {titulo}

                    </small>

                    <h3 className="fw-bold mt-2">

                        {valor}

                    </h3>

                </div>

              
            </div>

        </div>

    );

}