package org.web3j;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Convert;
import org.web3j.utils.Numeric;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.Optional;

/**
 * <p>This is the generated class for <code>web3j new helloworld</code></p>
 * <p>It deploys the Hello World contract in src/main/solidity/ and prints its address</p>
 * <p>For more information on how to run this project, please refer to our <a href="https://docs.web3j.io/quickstart/#deployment">documentation</a></p>
 */
public class Web3AppTransaction {

   public static void main(String[] args) throws Exception {
       String ganacheHost = "http://0.0.0.0:8286";
       Web3j web3j = Web3j.build(new HttpService(ganacheHost));
       EthBlockNumber ethBlockNumber = web3j.ethBlockNumber().sendAsync().get();
       System.out.println("Block Number = " + ethBlockNumber.getBlockNumber().toString());


       BufferedReader br=new BufferedReader(new InputStreamReader(System.in));

       String privateKey = System.getenv("MY_ACCOUNT_PRIVATE_KEY");
       Credentials credentials = Credentials.create(privateKey);

       System.out.println("Account address: " + credentials.getAddress());
       System.out.println("Balance: "
               + Convert.fromWei(web3j.ethGetBalance(credentials.getAddress(), DefaultBlockParameterName.LATEST)
               .send().getBalance().toString(), Convert.Unit.ETHER));

       // Get the latest nonce of current account
       EthGetTransactionCount ethGetTransactionCount = web3j
               .ethGetTransactionCount(credentials.getAddress(), DefaultBlockParameterName.LATEST).send();
       BigInteger nonce = ethGetTransactionCount.getTransactionCount();

       // Recipient address
       String recipientAddress = "0x3FA65455BB629AEbdc713c5A6027203CA7DB1222";
       // Value to transfer (in wei)
       System.out.println("Enter Amount to be sent:");
       String amountToBeSent= br.readLine();
       BigInteger value = Convert.toWei(amountToBeSent, Convert.Unit.ETHER).toBigInteger();

       // Gas Parameter
       BigInteger gasLimit = BigInteger.valueOf(21000);
       BigInteger gasPrice = Convert.toWei("1", Convert.Unit.GWEI).toBigInteger();

       // Prepare the rawTransaction
       RawTransaction rawTransaction = RawTransaction.createEtherTransaction(nonce, gasPrice, gasLimit,
               recipientAddress, value);

       // Sign the transaction
       byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
       String hexValue = Numeric.toHexString(signedMessage);

       // Send transaction
       EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();
       String transactionHash = ethSendTransaction.getTransactionHash();
       System.out.println("transactionHash: " + transactionHash);

       // Wait for transaction to be mined
       Optional<TransactionReceipt> transactionReceipt = null;
       do {
           System.out.println("checking if transaction " + transactionHash + " is mined....");
           EthGetTransactionReceipt ethGetTransactionReceiptResp = web3j.ethGetTransactionReceipt(transactionHash)
                   .send();
           transactionReceipt = ethGetTransactionReceiptResp.getTransactionReceipt();
           Thread.sleep(3000); // Wait for 3 sec
       } while (!transactionReceipt.isPresent());

       System.out.println("Transaction " + transactionHash + " was mined in block # "
               + transactionReceipt.get().getBlockNumber());
       System.out.println("Balance: "
               + Convert.fromWei(web3j.ethGetBalance(credentials.getAddress(), DefaultBlockParameterName.LATEST)
               .send().getBalance().toString(), Convert.Unit.ETHER));

       }
}

