import { useState, useEffect } from "react";
import TarefaContext from "./TarefaContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Tarefa() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: "",
        descricao: "", pessoa : ""
    });
    const [listaPessoas, setListaPessoas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas/${codigo}`)
        .then(response => response.json())
        .then(data => setObjeto(data))
        .catch(err => setAlerta({ status: "error", message: err }));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo =  editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas`,
            {
                method : metodo,
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            }).then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                if (!editar){
                    setEditar(true);
                }
            })
        } catch(err){
            setAlerta({ status: "error", message: err })
        }
        recuperaTarefas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaTarefas = async () => {
        setCarregando(true);
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }));
        setCarregando(false);
    }    
 
    const recuperaPessoas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/pessoas`)
            .then(response => response.json())
            .then(data => setListaPessoas(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
            recuperaTarefas();
        }
    }

    useEffect(() => {
        recuperaTarefas();
        recuperaPessoas();
    }, []);

    return (
        <TarefaContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaPessoas, remover,
            objeto, setObjeto,
            editar, setEditar, 
            recuperar, acaoCadastrar, 
            handleChange, listaPessoas
        }}>
             { !carregando ? <Tabela /> : <Carregando/> }
            <Form/>
        </TarefaContext.Provider>
    )

}

export default Tarefa;