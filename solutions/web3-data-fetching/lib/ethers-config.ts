import { ethers } from 'ethers';

// 更可靠的公共以太坊节点列表
const PUBLIC_RPC_ENDPOINTS = [
  'https://ethereum.publicnode.com', // 通常比较稳定
  'https://cloudflare-eth.com',      // Cloudflare的节点
  'https://rpc.flashbots.net/'       // Flashbots节点
];

// 判断当前环境是否为浏览器
const isBrowser = typeof window !== 'undefined';

// 获取默认提供商
export const getProvider = () => {
  // 在服务器端，可以直接连接RPC端点
  if (!isBrowser) {
    return new ethers.providers.JsonRpcProvider(PUBLIC_RPC_ENDPOINTS[0]);
  }
  
  // 在浏览器端，使用默认提供商，它将通过Infura或Etherscan连接
  // 这些服务有正确的CORS设置，允许从浏览器访问
  return ethers.getDefaultProvider('mainnet');
};

// 获取回退提供商
export const getFallbackProvider = () => {
  // 在服务器端使用回退提供商集合
  if (!isBrowser) {
    // 创建多个提供商
    const providers = PUBLIC_RPC_ENDPOINTS.map(
      (url) => new ethers.providers.JsonRpcProvider(url)
    );

    // 返回一个回退提供商，仅需要1个成功的响应
    return new ethers.providers.FallbackProvider(
      providers.map((provider, index) => ({
        provider,
        priority: index + 1,
        weight: 1
      })),
      1 // 仅需要1个成功的响应
    );
  }
  
  // 在浏览器端，仍然使用默认提供商，但指定多个网络
  return ethers.getDefaultProvider('mainnet', {
    // 自动使用公共API密钥 - 对于演示足够了
    infura: true,
    alchemy: false,
    etherscan: true,
    pocket: false,
    ankr: false
  });
}; 