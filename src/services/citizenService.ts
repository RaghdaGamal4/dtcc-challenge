import { Citizen } from "@/shared/models/Citizen.model";
import { contractAbi, contractAddress } from "@/shared/constants/index";
import Web3 from "web3";
import { getCitizensIds } from "@/shared/utils/utils";
import { parametersTypes } from "@/shared/constants/constants";

const provider =
    (window as any).ethereum ||
    (window as any).web3?.currentProvider;

const web3 = new Web3(provider);
const contract = new web3.eth.Contract(contractAbi as any, contractAddress);

export const citizensAPI = {
    getCitizensCount: async (): Promise<number> => {
        const events = await contract.getPastEvents("Citizen", {
            fromBlock: 0,
            toBlock: "latest"
        });

        return events.length;
    },

    fetchCitizens: async (page: number, limit: number, count: number): Promise<Citizen[]> => {
        const id = getCitizensIds(page, limit, count);

        const citizenLogs = await contract.getPastEvents("Citizen", {
            filter: { id },
            fromBlock: 0,
            toBlock: "latest"
        });

        const transactionsData = citizenLogs.map(async ({ transactionHash, returnValues: { id, age, name } }: { transactionHash: any, returnValues: Citizen }) => {
            try {
                const { input } = await web3.eth.getTransaction(transactionHash);
                const data = web3.eth.abi.decodeParameters(parametersTypes, input.slice(10));
                return { id: parseInt(id || ""), age: parseInt(age), name, city: data.city };
            } catch (error) {
                return { id: parseInt(id || ""), age: parseInt(age), name, city: "" };
            }
        });

        return Promise.all(transactionsData);
    },

    fetchNote: async (id: string): Promise<string> => {
        return await contract.methods.getNoteByCitizenId(id).call();
    },

};