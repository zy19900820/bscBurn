
const ethers = require("ethers");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.ninicoin.io");

  key = "" //这里填写私钥
  const wallet = new ethers.Wallet(key, provider)

  const address = await wallet.getAddress();
  console.log("address:", address)
  
  const tx = {
    to: "0x4e264027Fc8A8599adA50aA6a19695e65cf9f15f",
    value: ethers.utils.parseEther("0.002"),
    gasPrice: ethers.utils.parseUnits("3", "gwei")
  };

  const abi = [
    "function balanceOf(address) view returns (uint)",
  ];
  const burnAddress = "0x19c018e13CFf682e729CC7b5Fb68c8A641bf98A4";
  const contract = new ethers.Contract(
    burnAddress,
    abi,
    provider
  );

  // iii. 发送交易，获得收据
  while (1) {
        try {
          console.log("balance:", ethers.utils.formatEther(await provider.getBalance(address)))
        const receipt = await wallet.sendTransaction(tx);
        console.log(receipt)
        await receipt.wait(); // 等待链上确认交易
        console.log(receipt); // 打印交易详情
        // iv. 打印交易后余额
        console.log(`\niii. 发送后余额`);
        
        console.log(
        `钱包: ${ethers.utils.formatEther(await provider.getBalance(address))} `
        );
    
        const balanceBurn = await contract.balanceOf(address);
        console.log("balance of:", ethers.utils.formatEther(balanceBurn));
        } catch (e) {
          console.log("err:", e)
        }
        console.log("sleep 40s for next")
        await sleep(40000)
    }
};

main();
