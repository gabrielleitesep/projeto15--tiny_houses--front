import { Link } from "react-router-dom";
import imgLogo from "../assets/House.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/useContext";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setDados } = useContext(UserContext);

    function fazerLogin(e) {
        e.preventDefault();

        const body = {
            email: email,
            password: password
        };

        const promise = axios.post("http://localhost:5000/", body);

        promise.then(res => {
            console.log(res.data);
            setDados(res.data);
            navigate("/");
        });

        promise.catch(err => {
            console.log(err.response.data.message);
            alert("Usuário ou senha inválidos");
        });
    };

    return (
        <div className="containerLogin">
            <div className="containerLogo">
                <img src={imgLogo} alt="logo do site" />
            </div>
            <div className="containerInput">
                <form onSubmit={fazerLogin}>
                    <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
                    <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} required></input>
                    <button type="submit" >Entrar</button>
                </form>
                <Link to="/">
                    <button>Continuar comprando</button>
                </Link>
            </div>
            <div className="containerCadastro">
                <Link to="/cadastro">
                    <h1>Criar conta</h1>
                </Link>
                <Link to="/login-admin">
                    <h1>Logar como administrador</h1>
                </Link>
            </div>
        </div>
    );
};