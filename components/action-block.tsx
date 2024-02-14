import styles from "../styles/action-block.module.css";
import {Input} from "@chakra-ui/input";
import type { AccountInterface } from "starknet";
import { connect } from "get-starknet";
import { executeSwap, fetchQuotes, Quote } from "@avnu/avnu-sdk";
import { parseUnits } from 'ethers';
import { useStarknet } from "../hooks/useStarknet";
import { Select } from '@chakra-ui/react';
import { ACTIONS, ProtocolNames } from '../constants/constants';
// @ts-ignore
import {Btc, Usdt} from 'react-cryptocoins';
import TokenChooser from "./token-chooser";
import {ArrowDownIcon} from "@chakra-ui/icons";
import {AVNU_TOKENS, SELECTABLE_TOKENS , JEDI_TOKENS} from "../constants/constants";
import { ChangeEvent, useEffect, useState} from "react";
import {motion, useMotionValue} from "framer-motion"

const AVNU_OPTIONS = { baseUrl: 'https://goerli.api.avnu.fi' };

const ActionBlock = ({ actionName, protocolName, onActionChange, onProtocolChange }) => {
console.log(protocolName, "protocolName");

  const x = useMotionValue(0);
  const xPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const [xPos, setXPos] = useState(x);

  const [selectedTokenFrom, setSelectedTokenFrom] = useState(SELECTABLE_TOKENS[0]);
  const [selectedTokenTo, setSelectedTokenTo] = useState(SELECTABLE_TOKENS[1]);

  console.log(selectedTokenFrom.address, selectedTokenTo.address);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  // const [ account, setAccount ] = useState<AccountInterface>()
  const [ sellAmount, setSellAmount ] = useState<string>()
  const [ quotes, setQuotes ] = useState<Quote[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ errorMessage, setErrorMessage ] = useState<string>()
  const [ successMessage, setSuccessMessage ] = useState<string>()
  const { account, provider, setAccount, setProvider, connectWallet, disconnect } = useStarknet();

  const handleConnect = async () => {
    // const starknet = await connect();
    // if (!starknet) return;
    // await starknet.enable();
    if (account.address) {
      setAccount(account)
    }
  }

    // Determine which token list to use based on the protocolName
    const selectableTokens = protocolName === 'AAVNU' ? AVNU_TOKENS : protocolName === 'JEDISWAP' ? JEDI_TOKENS : SELECTABLE_TOKENS;

    useEffect(() => {
      // Reset selected tokens when protocol changes
      setSelectedTokenFrom(selectableTokens[0]);
      setSelectedTokenTo(selectableTokens[1]);
    }, [protocolName, selectableTokens]);

  console.log(selectedTokenFrom, selectedTokenTo,"s")


  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!account) return;
    setErrorMessage('')
    setQuotes([])
    setSellAmount(event.target.value);
    setLoading(true)
    const params = {
      sellTokenAddress: selectedTokenFrom.address,
      buyTokenAddress: selectedTokenTo.address,
      sellAmount: parseUnits(event.target.value, selectedTokenFrom.decimals),
      takerAddress: account.address,
      size: 1,
    }
    fetchQuotes(params, AVNU_OPTIONS)
      .then((quotes) => {
        setLoading(false)
        setQuotes(quotes)
      })
      .catch(() => setLoading(false));
  }
  console.log(quotes)

  const aavnuswap = async () => {
    executeSwap(account, quotes[0], {slippage: 1}, AVNU_OPTIONS)
    .then(() => {
      setSuccessMessage('success')
      setLoading(false)
      setQuotes([])
    })
    .catch((error: Error) => {
      setLoading(false)
      setErrorMessage(error.message)
    });
  };

  const handleSwap = async () => {
    if (!account || !sellAmount || !quotes || !quotes[0]) return;
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true);
    if(protocolName === "AAVNU") {
      aavnuswap();
    };
  }

  useEffect(() => {

  }, [x]);
  console.log(quotes)

  if (!account) {
    return <button onClick={handleConnect}>Connect Wallet</button>
  }

  return (
      <div className={styles.block}>

        <div className={styles.actionNameWrapper}>
          <h3 className={styles.actionName}>{actionName}</h3>
        </div>

        <p className={styles.protocolName}>{protocolName}</p>

        <Select value={actionName} onChange={(e) => onActionChange(e.target.value)} color="greenyellow">

        {Object.entries(ACTIONS).map(([key, value]) => (
          <option key={key} value={key}>
                {console.log(value,"actions value")}
            {value.name}
          </option>
        ))}
      </Select>
      <Select value={protocolName} onChange={(e) => onProtocolChange(e.target.value)} color="greenyellow">
        {Object.entries(ProtocolNames).map(([key, value]) => (
          <option key={key} value={key} className="text-blue-400">
            {value}
          </option>
        ))}
      </Select>

        <div className={styles.actionInputsWrapper}>
          <div className={styles.actionInputField}>
            <TokenChooser
              selectedToken={selectedTokenFrom}
              setSelectedToken={setSelectedTokenFrom}
              selectableTokens={selectableTokens}
            />
            <Input
              placeholder="Input amount"
              color="gray.300"
              height={"3rem"}
              borderRadius="md"
              borderColor="gray.300"
              _hover={{borderColor: "gray.500"}}
              _focus={{borderColor: "gray.500"}}
              // value={amountFrom}
              onChange={handleChangeInput} disabled={loading}
            />
          </div>
          <ArrowDownIcon w={10} h={10} color={"#fff"}/>

          <div className={styles.actionInputField}>
            <TokenChooser
              selectedToken={selectedTokenTo}
              setSelectedToken={setSelectedTokenTo}
              selectableTokens={selectableTokens}
            />
            <Input
              readOnly
              placeholder="Output amount"
              color="gray.300"
              height={"3rem"}
              borderRadius="md"
              borderColor="gray.300"
              _hover={{borderColor: "gray.500"}}
              _focus={{borderColor: "gray.500"}}
              value={(quotes && quotes[0]) ? (quotes[0].sellAmountInUsd) : ''}
            />
          </div>
          <div>
            {loading ? <p style={{ color: 'green' }}>Loading...</p> : quotes && quotes[0] && <button style={{ color: 'green' }} onClick={handleSwap}>Swap</button>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>Success</p>}
            </div>
        </div>
      </div>

      
    // </motion.div>
  )
}
export default ActionBlock;