// npx hardhat run scripts/deploy.ts --network goerli
import hre, { ethers, network, artifacts } from 'hardhat'
import fs from 'fs'
const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128);
import * as dotenv from "dotenv"

dotenv.config();
var msg = color.xterm(39).bgXterm(128)

async function main() {
  
  console.log("\nDeployment in progress...") 
  const Registry = await ethers.getContractFactory("Registry")
  const registry = await Registry.deploy()
  await registry.deployed()
  console.log("\nRegistry deployed at", msg(registry.address), "✅")
  const receipt = await ethers.provider.getTransactionReceipt(registry.deployTransaction.hash)
  console.log("\nBlock number:", msg(receipt.blockNumber))

  try {
    console.log("\nEtherscan verification in progress...")
    await registry.deployTransaction.wait(6)
    await hre.run("verify:verify", { network: network.name, address: registry.address, constructorArguments: [], })
    console.log("Etherscan verification done. ✅")
  } catch (error) {
    console.error(error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});
