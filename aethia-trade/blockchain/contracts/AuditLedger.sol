// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuditLedger
 * @dev Stores strategy hashes and state roots for regulatory audit.
 * Standardizes off-chain high-frequency execution with on-chain cryptographic anchoring.
 */
contract AuditLedger {
    struct AuditReceipt {
        string receiptId;
        uint256 blockNumber;
        string transactionHash;
        bytes32 consensusHash;
        bytes32 stateRoot;
        string walletSignature;
        string brokerExecutionId;
        uint256 timestamp;
    }

    // Mapping from receipt ID to cryptographic audit receipt
    mapping(string => AuditReceipt) private receipts;
    
    // Mapping from strategy ID to it's hashed payload
    mapping(string => bytes32) private strategyHashes;

    event AuditLogged(
        string indexed receiptId,
        string indexed brokerExecutionId,
        bytes32 consensusHash,
        bytes32 stateRoot,
        uint256 timestamp
    );

    event StrategyRegistered(
        string indexed strategyId,
        bytes32 indexed strategyHash
    );

    /**
     * @dev Register and seal strategy payload.
     */
    function registerStrategyHash(string calldata strategyId, bytes32 strategyHash) external {
        strategyHashes[strategyId] = strategyHash;
        emit StrategyRegistered(strategyId, strategyHash);
    }

    /**
     * @dev Seal cryptographic receipt to the blockchain state.
     */
    function logAuditReceipt(
        string calldata receiptId,
        string calldata transactionHash,
        bytes32 consensusHash,
        bytes32 stateRoot,
        string calldata walletSignature,
        string calldata brokerExecutionId
    ) external {
        receipts[receiptId] = AuditReceipt({
            receiptId: receiptId,
            blockNumber: block.number,
            transactionHash: transactionHash,
            consensusHash: consensusHash,
            stateRoot: stateRoot,
            walletSignature: walletSignature,
            brokerExecutionId: brokerExecutionId,
            timestamp: block.timestamp
        });

        emit AuditLogged(receiptId, brokerExecutionId, consensusHash, stateRoot, block.timestamp);
    }

    /**
     * @dev Fetch stored audit receipt.
     */
    function getAuditReceipt(string calldata receiptId) external view returns (AuditReceipt memory) {
        return receipts[receiptId];
    }
}
