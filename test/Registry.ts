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
    it("Should add an entry", async function () {
      const { admin, registry } = await loadFixture(deployContracts)
      await registry.connect(admin).addEntry(5, admin.address, 1, 1, "", 1, "", "")
      expect((await registry.assets(0)).contractAddress).to.equal(admin.address)
    })

    it("Should get the asset id", async function () {
      const { admin, registry } = await loadFixture(deployContracts)
      await registry.connect(admin).addEntry(5, admin.address, 1, 1, "", 1, "", "")
      const result = await registry.getAsset(1)
      expect(await registry.getAsset(1)).to.equal(0)
    })

    it("Should edit an entry", async function () {
      const { deployer, admin, registry } = await loadFixture(deployContracts)
      await registry.connect(admin).addEntry(5, admin.address, 1, 1, "", 1, "", "")
      await registry.connect(admin).editEntry(5, deployer.address, 1, 1, "", 1, "", "")
      expect((await registry.assets(0)).contractAddress).to.equal(deployer.address)
    })
  })
})
