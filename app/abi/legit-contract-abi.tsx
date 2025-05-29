export const legitContractLocal = {
  address: "0x1Ea20598Ef02ca6527e662aAc8cbE687Eb8B0B1E",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], type: "error", name: "AccountBalanceOverflow" },
    { inputs: [], type: "error", name: "AlreadyInitialized" },
    { inputs: [], type: "error", name: "BalanceQueryForZeroAddress" },
    { inputs: [], type: "error", name: "NewOwnerIsZeroAddress" },
    { inputs: [], type: "error", name: "NoHandoverRequest" },
    { inputs: [], type: "error", name: "NotOwnerNorApproved" },
    { inputs: [], type: "error", name: "TokenAlreadyExists" },
    { inputs: [], type: "error", name: "TokenDoesNotExist" },
    { inputs: [], type: "error", name: "TransferFromIncorrectOwner" },
    {
      inputs: [],
      type: "error",
      name: "TransferToNonERC721ReceiverImplementer",
    },
    { inputs: [], type: "error", name: "TransferToZeroAddress" },
    { inputs: [], type: "error", name: "Unauthorized" },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
          indexed: true,
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
          indexed: true,
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
          indexed: true,
        },
      ],
      type: "event",
      name: "Approval",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
          indexed: true,
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
          indexed: true,
        },
        {
          internalType: "bool",
          name: "isApproved",
          type: "bool",
          indexed: false,
        },
      ],
      type: "event",
      name: "ApprovalForAll",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
          indexed: true,
        },
        {
          internalType: "string",
          name: "assetKey",
          type: "string",
          indexed: true,
        },
        {
          internalType: "uint32",
          name: "nonce",
          type: "uint32",
          indexed: false,
        },
      ],
      type: "event",
      name: "AssetMinted",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
          indexed: true,
        },
        {
          internalType: "string",
          name: "assetKey",
          type: "string",
          indexed: true,
        },
        {
          internalType: "uint32",
          name: "totalSupply",
          type: "uint32",
          indexed: false,
        },
      ],
      type: "event",
      name: "AssetRegistered",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "pendingOwner",
          type: "address",
          indexed: true,
        },
      ],
      type: "event",
      name: "OwnershipHandoverCanceled",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "pendingOwner",
          type: "address",
          indexed: true,
        },
      ],
      type: "event",
      name: "OwnershipHandoverRequested",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "oldOwner",
          type: "address",
          indexed: true,
        },
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
          indexed: true,
        },
      ],
      type: "event",
      name: "OwnershipTransferred",
      anonymous: false,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
          indexed: true,
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
          indexed: true,
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
          indexed: true,
        },
      ],
      type: "event",
      name: "Transfer",
      anonymous: false,
    },
    {
      inputs: [
        { internalType: "bytes", name: "assetKey", type: "bytes" },
        {
          internalType: "uint32",
          name: "supplyToAdd",
          type: "uint32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "addSupply",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
      name: "approve",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      stateMutability: "view",
      type: "function",
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "result", type: "uint256" }],
    },
    {
      inputs: [],
      stateMutability: "payable",
      type: "function",
      name: "cancelOwnershipHandover",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "pendingOwner",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "function",
      name: "completeOwnershipHandover",
    },
    {
      inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
      stateMutability: "view",
      type: "function",
      name: "getApproved",
      outputs: [{ internalType: "address", name: "result", type: "address" }],
    },
    {
      inputs: [{ internalType: "bytes", name: "assetKey", type: "bytes" }],
      stateMutability: "view",
      type: "function",
      name: "getAssetTotalSupply",
      outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    },
    {
      inputs: [
        { internalType: "bytes", name: "assetKey", type: "bytes" },
        { internalType: "uint32", name: "tokenId", type: "uint32" },
      ],
      stateMutability: "view",
      type: "function",
      name: "getOwnerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "bytes32", name: "role", type: "bytes32" },
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "grantRole",
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "bytes32", name: "role", type: "bytes32" },
      ],
      stateMutability: "view",
      type: "function",
      name: "hasRole",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "bytes", name: "assetKey", type: "bytes" },
        { internalType: "uint32", name: "tokenId", type: "uint32" },
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "mint",
    },
    {
      inputs: [],
      stateMutability: "pure",
      type: "function",
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
    },
    {
      inputs: [],
      stateMutability: "view",
      type: "function",
      name: "owner",
      outputs: [{ internalType: "address", name: "result", type: "address" }],
    },
    {
      inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
      stateMutability: "view",
      type: "function",
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "result", type: "address" }],
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "pendingOwner",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      name: "ownershipHandoverExpiresAt",
      outputs: [{ internalType: "uint256", name: "result", type: "uint256" }],
    },
    {
      inputs: [
        { internalType: "bytes", name: "assetKey", type: "bytes" },
        {
          internalType: "uint32",
          name: "totalSupply",
          type: "uint32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "registerAsset",
    },
    {
      inputs: [],
      stateMutability: "payable",
      type: "function",
      name: "renounceOwnership",
    },
    {
      inputs: [],
      stateMutability: "payable",
      type: "function",
      name: "requestOwnershipHandover",
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "bytes32", name: "role", type: "bytes32" },
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "revokeRole",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
      name: "safeTransferFrom",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      stateMutability: "payable",
      type: "function",
      name: "safeTransferFrom",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        { internalType: "bool", name: "isApproved", type: "bool" },
      ],
      stateMutability: "nonpayable",
      type: "function",
      name: "setApprovalForAll",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      stateMutability: "view",
      type: "function",
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    },
    {
      inputs: [],
      stateMutability: "pure",
      type: "function",
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
    },
    {
      inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
      stateMutability: "view",
      type: "function",
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
      name: "transferFrom",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      stateMutability: "payable",
      type: "function",
      name: "transferOwnership",
    },
  ],
};

export const legitContractSepolia = {
  address: "0x69664de546696a10Db87d8590c728BAaE1D15307",
  abi: [
    {
      type: "constructor",
      inputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addSupply",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "supplyToAdd",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "approve",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "cancelOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "completeOwnershipHandover",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "getApproved",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getAssetTotalSupply",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOwnerOf",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "tokenId",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isApprovedForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "tokenId",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownerOf",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownershipHandoverExpiresAt",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "registerAsset",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "totalSupply",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "requestOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "setApprovalForAll",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "tokenURI",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "account",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ApprovalForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverCanceled",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverRequested",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "oldOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AccountBalanceOverflow",
      inputs: [],
    },
    {
      type: "error",
      name: "AlreadyInitialized",
      inputs: [],
    },
    {
      type: "error",
      name: "BalanceQueryForZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "NewOwnerIsZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "NoHandoverRequest",
      inputs: [],
    },
    {
      type: "error",
      name: "NotOwnerNorApproved",
      inputs: [],
    },
    {
      type: "error",
      name: "TokenAlreadyExists",
      inputs: [],
    },
    {
      type: "error",
      name: "TokenDoesNotExist",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferFromIncorrectOwner",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferToNonERC721ReceiverImplementer",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferToZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "Unauthorized",
      inputs: [],
    },
  ],
};

export const legitContractSepoliaV2 = {
  address: "0xE248B4C9cc6b627Db43f7A83408b10062980E779",
  tx: "0xe67e6b8e7b6336cb3860be392f6c7ed994932e14135c81dac2adced4825b74ef",
  abi: [
    {
      type: "constructor",
      inputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addSupply",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "supplyToAdd",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "approve",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "cancelOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "completeOwnershipHandover",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "getApproved",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getAssetTotalSupply",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOwnerOf",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "tokenId",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "grantRole",
      inputs: [
        {
          name: "user",
          type: "address",
          internalType: "address",
        },
        {
          name: "role",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "hasRole",
      inputs: [
        {
          name: "user",
          type: "address",
          internalType: "address",
        },
        {
          name: "role",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isApprovedForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "tokenId",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownerOf",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownershipHandoverExpiresAt",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "registerAsset",
      inputs: [
        {
          name: "assetKey",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "totalSupply",
          type: "uint32",
          internalType: "uint32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "requestOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "revokeRole",
      inputs: [
        {
          name: "user",
          type: "address",
          internalType: "address",
        },
        {
          name: "role",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "setApprovalForAll",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      outputs: [
        {
          name: "result",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "tokenURI",
      inputs: [
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "account",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ApprovalForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverCanceled",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverRequested",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "oldOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AccountBalanceOverflow",
      inputs: [],
    },
    {
      type: "error",
      name: "AlreadyInitialized",
      inputs: [],
    },
    {
      type: "error",
      name: "BalanceQueryForZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "NewOwnerIsZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "NoHandoverRequest",
      inputs: [],
    },
    {
      type: "error",
      name: "NotOwnerNorApproved",
      inputs: [],
    },
    {
      type: "error",
      name: "TokenAlreadyExists",
      inputs: [],
    },
    {
      type: "error",
      name: "TokenDoesNotExist",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferFromIncorrectOwner",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferToNonERC721ReceiverImplementer",
      inputs: [],
    },
    {
      type: "error",
      name: "TransferToZeroAddress",
      inputs: [],
    },
    {
      type: "error",
      name: "Unauthorized",
      inputs: [],
    },
  ],
};

export const legitContractSepoliaV3 = {
  address: "0x3Aa79bc2A0636Ac7Ba50997BD203a02971892a25",
  tx: "0x9fe96376b8aad174b8f2cb740522e7f9897df2f23576b281c614bfd0d1fe1c84",
  abi: [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    {
      type: "function",
      name: "addSupply",
      inputs: [
        { name: "assetKey", type: "bytes", internalType: "bytes" },
        { name: "supplyToAdd", type: "uint32", internalType: "uint32" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "approve",
      inputs: [
        { name: "account", type: "address", internalType: "address" },
        { name: "id", type: "uint256", internalType: "uint256" },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [{ name: "owner", type: "address", internalType: "address" }],
      outputs: [{ name: "result", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "cancelOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "completeOwnershipHandover",
      inputs: [
        { name: "pendingOwner", type: "address", internalType: "address" },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "getApproved",
      inputs: [{ name: "id", type: "uint256", internalType: "uint256" }],
      outputs: [{ name: "result", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getAssetTotalSupply",
      inputs: [{ name: "assetKey", type: "bytes", internalType: "bytes" }],
      outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOwnerOf",
      inputs: [
        { name: "assetKey", type: "bytes", internalType: "bytes" },
        { name: "tokenId", type: "uint32", internalType: "uint32" },
      ],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "grantRole",
      inputs: [
        { name: "user", type: "address", internalType: "address" },
        { name: "role", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "hasRole",
      inputs: [
        { name: "user", type: "address", internalType: "address" },
        { name: "role", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [{ name: "", type: "bool", internalType: "bool" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isApprovedForAll",
      inputs: [
        { name: "owner", type: "address", internalType: "address" },
        { name: "operator", type: "address", internalType: "address" },
      ],
      outputs: [{ name: "result", type: "bool", internalType: "bool" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        { name: "to", type: "address", internalType: "address" },
        { name: "assetKey", type: "bytes", internalType: "bytes" },
        { name: "tokenId", type: "uint32", internalType: "uint32" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [{ name: "", type: "string", internalType: "string" }],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [{ name: "result", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownerOf",
      inputs: [{ name: "id", type: "uint256", internalType: "uint256" }],
      outputs: [{ name: "result", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "ownershipHandoverExpiresAt",
      inputs: [
        { name: "pendingOwner", type: "address", internalType: "address" },
      ],
      outputs: [{ name: "result", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "registerAsset",
      inputs: [
        { name: "assetKey", type: "bytes", internalType: "bytes" },
        { name: "totalSupply", type: "uint32", internalType: "uint32" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "requestOwnershipHandover",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "revokeRole",
      inputs: [
        { name: "user", type: "address", internalType: "address" },
        { name: "role", type: "bytes32", internalType: "bytes32" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        { name: "from", type: "address", internalType: "address" },
        { name: "to", type: "address", internalType: "address" },
        { name: "id", type: "uint256", internalType: "uint256" },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "safeTransferFrom",
      inputs: [
        { name: "from", type: "address", internalType: "address" },
        { name: "to", type: "address", internalType: "address" },
        { name: "id", type: "uint256", internalType: "uint256" },
        { name: "data", type: "bytes", internalType: "bytes" },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "setApprovalForAll",
      inputs: [
        { name: "operator", type: "address", internalType: "address" },
        { name: "isApproved", type: "bool", internalType: "bool" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
      outputs: [{ name: "result", type: "bool", internalType: "bool" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [{ name: "", type: "string", internalType: "string" }],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "tokenURI",
      inputs: [{ name: "id", type: "uint256", internalType: "uint256" }],
      outputs: [{ name: "", type: "string", internalType: "string" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        { name: "from", type: "address", internalType: "address" },
        { name: "to", type: "address", internalType: "address" },
        { name: "id", type: "uint256", internalType: "uint256" },
      ],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "account",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ApprovalForAll",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "operator",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "isApproved",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "AssetMinted",
      inputs: [
        {
          name: "user",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "assetKey",
          type: "string",
          indexed: true,
          internalType: "string",
        },
        {
          name: "nonce",
          type: "uint32",
          indexed: false,
          internalType: "uint32",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "AssetRegistered",
      inputs: [
        {
          name: "user",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "assetKey",
          type: "string",
          indexed: true,
          internalType: "string",
        },
        {
          name: "totalSupply",
          type: "uint32",
          indexed: false,
          internalType: "uint32",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverCanceled",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipHandoverRequested",
      inputs: [
        {
          name: "pendingOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "oldOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    { type: "error", name: "AccountBalanceOverflow", inputs: [] },
    { type: "error", name: "AlreadyInitialized", inputs: [] },
    { type: "error", name: "BalanceQueryForZeroAddress", inputs: [] },
    { type: "error", name: "NewOwnerIsZeroAddress", inputs: [] },
    { type: "error", name: "NoHandoverRequest", inputs: [] },
    { type: "error", name: "NotOwnerNorApproved", inputs: [] },
    { type: "error", name: "TokenAlreadyExists", inputs: [] },
    { type: "error", name: "TokenDoesNotExist", inputs: [] },
    { type: "error", name: "TransferFromIncorrectOwner", inputs: [] },
    {
      type: "error",
      name: "TransferToNonERC721ReceiverImplementer",
      inputs: [],
    },
    { type: "error", name: "TransferToZeroAddress", inputs: [] },
    { type: "error", name: "Unauthorized", inputs: [] },
  ],
};