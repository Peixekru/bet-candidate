"use client"

import Head from "next/head";
import {useRouter} from "next/navigation"
import {useState} from "react"
import {login} from "@/services/web3Service";

export default function Home() {

  const { push } = useRouter();

  const[message, setMessage] = useState();

  function handleBet() {
    setMessage("Conectando na carteira...Aguarde...");

    login()
      .then(account => push("/bet"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  return (
    <>
      <Head>
        <title>Bet Candidate » Login</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/09/02155003/capa-trumb-e-kamala.jpg"
            className="d-block mx-lg-auto img-fluid rounded" width={500}
            />
          </div>
          <div className="col-6">
            <h1 className="dysplay-5 fw-bold text-emphasis lh-1 mb-3">Bet Candidate</h1>
            <p className="lead">Apostas on-chain nas eleições americanas.</p>
            <p className="lead">Autentique-se com a sua carteira e deixe sua aposta para as próximas eleições.</p>

            <div className="d-flex justify-content-start">
              <button type="button" className="btn my-btn btn-lg px-4" onClick={handleBet}>
                <img src="/metamask.svg" width={64} className="me-3"/>
                <span>Conectar com Metamask</span>
              </button>

            </div>
            <p className="message">{ message }</p>
          </div>
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
