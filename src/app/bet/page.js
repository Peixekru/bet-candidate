"use client"

import Head from "next/head";
import { useState } from "react"
import { useEffect } from "react";
import { useRouter } from "next/navigation"
import { claimPrize, getDispute, placeBet } from "@/services/web3Service";
import Web3 from "web3";


export default function Bet() {

    const { push } = useRouter();

    const [message, setMessage] = useState();
    const [dispute, setDispute] = useState({
        candidate1: "loading...",
        candidate2: "loaging...",
        image1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqos4iDPQ-tmt3lsUcv1vukzimTkHeblQErg&s",
        image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqos4iDPQ-tmt3lsUcv1vukzimTkHeblQErg&s",
        total1: 0,
        total2: 0,
        winner: 0
    });

    useEffect(() => {
        if (!localStorage.getItem("wallet")) return push("/");
        setMessage("Obtendo dados da disputa... Aguarde...");

        getDispute()
            .then(dispute => {
                setDispute(dispute);
                setMessage("");
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }, []);

    function handleBet(candidate) {
        setMessage("Conectando na carteira... Aguarde...");
        const amount = prompt("Quantidade em POL para apostar:", "1");
        placeBet(candidate, amount)
            .then(() => {
                alert("Aposta recebida com sucesso. Pode demorar 1 minuto para que apareça no sistema.");
                setMessage("");
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }

    function handleClaim() {
        setMessage("Conectando na carteira... Aguarde...");
        claimPrize()
            .then(() => {
                alert("Prêmio coletado com sucesso. Pode demorar 1 minuto para que apareça na sua carteira.");
                setMessage("");
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }

    return (
        <>
            <Head>
                <title>Bet Candidate » Apostar</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="container px-4 py-5">
                <div className="row align-items-center">
                    <h1 className="dysplay-5 fw-bold text-emphasis lh-1 mb-3">Bet Candidate</h1>
                    <p className="lead">Apostas on-chain nas eleições americanas.</p>

                    {
                        dispute.winner == 0
                            ? <p className="lead">Você tem até o dia da eleição para deixar sua aposta em um dos canidatos abaixo.</p>
                            : <p className="lead">Disputa encerrada. Veja o vencedor abaixo e solicite o seu prêmio.</p>
                    }


                </div>

                <div className="row g-1 py-5">

                    {
                        dispute.winner == 0 || dispute.winner == 1

                            ? <div className="col">
                                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                                    {dispute.candidate1}
                                </h3>
                                <img src={dispute.image1}
                                    className="d-block mx-auto rounded" width={250} />

                                {
                                    dispute.winner == 1
                                        ? <button
                                            className="btn my-btn p-3 my-2 d-block mx-auto"
                                            style={{ width: 250 }}
                                            onClick={handleClaim}>
                                            Pegar meu prêmio
                                        </button>

                                        : <button
                                            className="btn my-btn p-3 my-2 d-block mx-auto"
                                            style={{ width: 250 }}
                                            onClick={() => handleBet(1)}>
                                            Aposto nesse candidato
                                        </button>
                                }



                                <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{Web3.utils.fromWei(dispute.total1, "ether")} POL Apostado</span>
                            </div>

                            : <></>
                    }

                    {
                        dispute.winner == 0 || dispute.winner == 2

                            ? <div className="col">
                                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                                    {dispute.candidate2}
                                </h3>
                                <img src={dispute.image2}
                                    className="d-block mx-auto img-fluid rounded" width={250} />
                                {
                                    dispute.winner == 2
                                        ? <button
                                            className="btn my-btn p-3 my-2 d-block mx-auto"
                                            style={{ width: 250 }}
                                            onClick={handleClaim}>
                                            Pegar meu prêmio
                                        </button>

                                        : <button
                                            className="btn my-btn p-3 my-2 d-block mx-auto"
                                            style={{ width: 250 }}
                                            onClick={() => handleBet(2)}>
                                            Aposto nesse candidato
                                        </button>
                                }


                                <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{Web3.utils.fromWei(dispute.total2, "ether")} POL Apostado</span>
                            </div>

                            : <></>
                    }

                </div>

                <div className="row align-items-center">
                    <p className="message">{message}</p>
                </div>

                <footer className="d-flex flex-wrap justify-content-between align-itens-center py-3 py-4 border-top">
                    <p className="col-4 mb-0 text-body-secondary">
                        &copy; 2024 BetCandidate, Inc
                    </p>

                    <ul className="nav col-4 justify-content-end">
                        <li className="nav-item"><a className="nav-link px-2 text-body-secondary" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link px-2 text-body-secondary" href="/about">About</a></li>
                    </ul>

                </footer>

            </div>
        </>
    );
}
