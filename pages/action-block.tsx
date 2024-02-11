
import styles from "../styles/action-block.module.css";
import {Input} from "@chakra-ui/input";
import type { AccountInterface } from "starknet";
import { connect } from "get-starknet";
import { executeSwap, fetchQuotes, Quote } from "@avnu/avnu-sdk";
import { parseUnits } from 'ethers';

// @ts-ignore
import {Btc, Usdt} from 'react-cryptocoins';
import TokenChooser from "../components/token-chooser";
import {ArrowDownIcon} from "@chakra-ui/icons";
import {SELECTABLE_TOKENS} from "../constants/contants";
import { ChangeEvent, useEffect, useState} from "react";
import {motion, useMotionValue} from "framer-motion"

const AVNU_OPTIONS = { baseUrl: 'https://goerli.api.avnu.fi' };

const ethAddress = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
const usdcAddress = "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426"

const ActionBlock = (props: any) => {

  const x = useMotionValue(0);
  const xPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const [xPos, setXPos] = useState(x);

  const [selectedTokenFrom, setSelectedTokenFrom] = useState(SELECTABLE_TOKENS[0]);
  const [selectedTokenTo, setSelectedTokenTo] = useState(SELECTABLE_TOKENS[1]);

  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [ account, setAccount ] = useState<AccountInterface>()
  const [ sellAmount, setSellAmount ] = useState<string>()
  const [ quotes, setQuotes ] = useState<Quote[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ errorMessage, setErrorMessage ] = useState<string>()
  const [ successMessage, setSuccessMessage ] = useState<string>()

  const handleConnect = async () => {
    const starknet = await connect();
    if (!starknet) return;
    await starknet.enable();
    if (starknet.isConnected && starknet.provider && starknet.account.address) {
      setAccount(starknet.account)
    }
  }

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!account) return;
    setErrorMessage('')
    setQuotes([])
    setSellAmount(event.target.value);
    setLoading(true)
    const params = {
      sellTokenAddress: ethAddress,
      buyTokenAddress: usdcAddress,
      sellAmount: parseUnits(event.target.value, 18),
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

  const handleSwap = async () => {
    if (!account || !sellAmount || !quotes || !quotes[0]) return;
    setErrorMessage('')
    setSuccessMessage('')
    setLoading(true)
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
  }

  useEffect(() => {

  }, [x]);
  console.log(quotes)

  if (account) {
    return <button onClick={handleConnect}>Connect Wallet</button>
  }

  return (
      <div className={styles.block}>

        <div className={styles.actionNameWrapper}>
          <h3 className={styles.actionName}>{props.actionName}</h3>
        </div>
        <p className={styles.protocolName}>{props.protocolName}</p>

        <div className={styles.actionInputsWrapper}>
          <div className={styles.actionInputField}>
            <TokenChooser
              selectedToken={selectedTokenFrom}
              setSelectedToken={setSelectedTokenFrom}
              selectableTokens={SELECTABLE_TOKENS}
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
              selectableTokens={SELECTABLE_TOKENS}
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
            {loading ? <p>Loading...</p> : quotes && quotes[0] && <button onClick={handleSwap}>Swap</button>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>Success</p>}
            </div>
        </div>
      </div>

      
    // </motion.div>
  )
}
export default ActionBlock;
