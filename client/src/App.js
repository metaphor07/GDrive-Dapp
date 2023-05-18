import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import Web3 from "web3";

import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (web3) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = new web3.eth.Contract(
          Upload.abi,
          "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
        );
        setContract(contract);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setProvider(web3);
      } else {
        console.error("Metamask is not installed");
      }
    };
    web3 && loadProvider();
  }, []);

  return (
    <div className="gdrive">
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          contract={contract}
          account={account}
        ></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        {/* <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div> */}

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </div>
  );
}

export default App;
