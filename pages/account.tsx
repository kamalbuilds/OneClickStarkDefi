import { Heading} from "@chakra-ui/react";

import { useAccount } from "@starknet-react/core";

const Account = () => {
  const { account, address, status } = useAccount();

  if (status === "disconnected") return <p>Disconnected</p>;
  return <p>Account: {address}</p>;
}
export default Account