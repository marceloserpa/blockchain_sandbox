package org.web3j;

import org.web3j.crypto.*;
import org.web3j.generated.contracts.HelloWorld;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.gas.StaticGasProvider;
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
public class DeployHelloContract {

    private static final String nodeUrl = System.getenv().getOrDefault("WEB3J_NODE_URL", "<node_url>");
    private static final String walletPassword = System.getenv().getOrDefault("WEB3J_WALLET_PASSWORD", "<wallet_password>");
    private static final String walletPath = System.getenv().getOrDefault("WEB3J_WALLET_PATH", "<wallet_path>");

    public static void main(String[] args) throws Exception {
        String ganacheHost = "http://0.0.0.0:8286";
        Web3j web3j = Web3j.build(new HttpService(ganacheHost));
        EthBlockNumber ethBlockNumber = web3j.ethBlockNumber().sendAsync().get();
        System.out.println("Block Number = " + ethBlockNumber.getBlockNumber().toString());

        String privateKey = System.getenv("MY_ACCOUNT_PRIVATE_KEY");
        Credentials credentials = Credentials.create(privateKey);

        System.out.println("Deploying HelloWorld contract ...");
        StaticGasProvider provider = new StaticGasProvider(BigInteger.valueOf(0), BigInteger.valueOf(3000000));
        HelloWorld helloWorld = HelloWorld.deploy(web3j, credentials, provider, "Hello Blockchain World!").send();
        System.out.println("Contract address: " + helloWorld.getContractAddress());
        System.out.println("Greeting method result: " + helloWorld.greeting().send());
    }
}

