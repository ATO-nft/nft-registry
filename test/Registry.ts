import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Registry", function () {

  async function deployContracts() {
    const [deployer, admin] = await ethers.getSigners()
    const Registry = await ethers.getContractFactory("Registry")
    const registry = await Registry.deploy()
    await registry.connect(deployer).transferOwnership(admin.address)
    return { deployer, admin, registry }
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { admin, registry } = await loadFixture(deployContracts)
      expect(await registry.owner()).to.equal(admin.address)
    })
  });

  describe("Interactions", function () {
    it("Should add an asset", async function () {
      const { admin, registry } = await loadFixture(deployContracts)
      await registry.addEntry(5, admin.address, 1)
      expect((await registry.assets(0)).contractAddress).to.equal(admin.address)
    })
  })
})
