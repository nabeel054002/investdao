import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useState, useRef, useEffect} from "react";
import {Contract, providers, BigNumber, utils} from "ethers";
import Web3Modal from "web3modal";
import {MUTUALFUND, MUTUALFUND_ABI} from "../constants";

export default function Home() {
  //const [addBalance, setAddBalance] = useState(0);
  //step one: connect wallet to appropriate network
  const [walletConnected, setWalletConnected] = useState(false);
  //const [users, setUsers] = useState([]);
  const web3ModalRef = useRef();
  const zero = BigNumber.from(0);
  const [balance, setBalance] = useState("");
  const [recentTime,setRecentTime] = useState("");

  const getBalance = async ()=>{
    const provider = await getProviderOrSigner();
    const mfContract = new Contract(MUTUALFUND, MUTUALFUND_ABI, provider);
    const balance_local = await provider.getBalance(mfContract.address);
    // console.log(
      // "asda before setting the thign",balance_local;
    setBalance(balance_local.toString());
    console.log("after setting the thing", balance_local);
  }
  const getRecentTime = async()=>{
    const provider = await getProviderOrSigner();
    const mfContract = new Contract(MUTUALFUND, MUTUALFUND_ABI, provider);
    const recentTime_local = await mfContract.recentTime();
    setRecentTime(recentTime_local.toString());
  }
  const takePart = async()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const mfContract = new Contract(MUTUALFUND, MUTUALFUND_ABI, signer);
      const tx = await mfContract.takePart({
        value:utils.parseEther("0.11"),
      })
      await getBalance();
    }
    catch(err){
      console.error(err);
    }
  }

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 1) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async()=>{
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
    }
    catch(err){
      console.error(err);
    }
  }
  // }
  // const getUsers = async () =>{
  //   const provider = await getProviderOrSigner();
  //   const mfContract = new Contract(MUTUALFUND, MUTUALFUND_ABI, provider);
  //   const users_local = await mfContract.Portfolio(0);
  //   setUsers([users_local]);
  // }
  useEffect(()=>{
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network:"hardhat",
        providerOptions: {},
        disableInjectedProvider: false,
      })
      connectWallet().then(()=>{
        getBalance();
        //getUsers();
        getRecentTime();
      });
    }
  })
  return (
    <div>
      <button onClick={takePart}>Take Part</button>
      {/* <p>{getBalance()}</p> */}
      <p>{console.log(balance)}</p>
      {/* <p>{console.log(users)}</p> */}
      <p>{recentTime}</p>
    </div>
    
  )
}
