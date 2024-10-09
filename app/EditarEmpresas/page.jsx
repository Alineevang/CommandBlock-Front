"use client"
import styles from "./editarempresas.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import {FiArrowLeft } from "react-icons/fi";
import { CiPhone } from "react-icons/ci";

import { useState } from "react";
import { message, Space } from 'antd';

const editarempresas = () => {

    const [response, setResponse] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [phone, setPhone] = useState("");

    const [messageApi, contextHolder] = message.useMessage();

    const clearInputs = () => {
        setName("");
        setEmail("");
        setCnpj("");
        setPhone("");
    }

    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    const error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };


    const handleSubmit = async () => {
        if (name === "" || email === "" || cnpj === "" || phone === "") {
            error("Preencha todos os campos!");
        } else {
            try {
                const response = await fetch(`https://49ab-201-63-78-210.ngrok-free.app/users`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
                    }),
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        cnpj: cnpj,
                        phone: phone,
                        type: "Aluno"
                    })
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage = response.statusText;
    
                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message;
                    } catch (e) {
                        console.error("Erro ao parsear JSON:", e);
                    }
    
                    throw new Error(errorMessage);
                }
    
                const responseData = await response.json();
                clearInputs()
                success(responseData.message);
    
                // Redireciona para a página de Login
                setTimeout(() => {
                    window.location.href = '/Login';
                }, 2000);
    
            } catch (err) {
                console.error(err);
                error(err.message); // Exibe apenas a mensagem de erro
            }
        }
    };



    return (
        <>
        <div className={styles.cadastro}>
            {contextHolder}
            <div className={styles.card}>

                <div className={styles.imagem}>
                <FiArrowLeft className={styles.arrow} />
                    <img src={'/cadastro.svg'}></img>
                </div>

                <div className={styles.forms}>
                    <h1 className={styles.title}> Editar Empresas</h1>
                    <p className={styles.text}>Por favor, Preencha o campo de nome e atualize os outros dados</p>
                    
                    <div className={styles.campos}>
                    <FaRegUser className={styles.icone} />
                    <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" 
                    placeholder="Nome da Empesa" 
                    required 
                    className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <MdOutlineEmail className={styles.icone} />
                    <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" 
                    placeholder="E-mail" 
                    required 
                    className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <IoLockClosedOutline className={styles.icone} />
                    <input 
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                    type="password" 
                    placeholder="CNPJ" 
                    required 
                    className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <CiPhone className={styles.icone} />
                    <input 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type="number" 
                    placeholder="Telefone" 
                    required 
                    className={styles.inputs} />
                    </div>

                    <button className={styles.button} onClick={handleSubmit}>Atualizar</button>

                </div>

            </div>
        </div>
        </>
    )
}

export default editarempresas;