import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MaterialPagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import CardSkeleton from "../../shared/components/CardSkeleton/CardSkeleton";
import { contractAbi, contractAddress } from "@/shared/constants/index";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { citizensAPI } from "@/services/citizenService";
import { Citizen } from "@/shared/models/Citizen.model";
import AddCitizenModal from "../AddCitizenModal/AddCitizenModal";
import { LoadingButton } from "@mui/lab";
import CitizenList from "./CitizenList/CitizenList";
import { pagination } from "@/shared/constants/constants";

function CitizenListPage() {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    const [citizens, setCitizens] = useState<Citizen[]>([]);

    const { address } = useAccount();
    const { data: hash, error: createError, isPending, writeContract } = useWriteContract();

    const addCitizen = async ({ age, name, city, note }: Citizen) => {
        await writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: "addCitizen",
            account: address,
            args: [age, city, name, note]
        });
        setPage(1);
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        setIsLoading(true);
        const logs = async () => {
            const count = await citizensAPI.getCitizensCount();
            const citizensData = await citizensAPI.fetchCitizens(page, pagination.perPage, count);
            setCitizens(citizensData.reverse());
            setCount(count);
        };
        logs();
        setIsLoading(false);
    }, [isConfirmed, page]);

    useEffect(() => {
        setIsLoading(false);
        if (isConfirmed) {
            toast("Citizen created successfully", {
                type: "success"
            });
            return;
        }
        if (createError) {
            toast("Something went wrong", {
                type: "error"
            });
        }

    }, [createError, isConfirmed]);
    return (

        <div className={"h-full w-full bg-white p-8 flex flex-col  "}>

            <div className="flex items-end justify-end mb-5">
                <LoadingButton
                    variant="contained"
                    size="large" loading={isPending}
                    onClick={() => setOpenDialog(true)}
                    mt="1rem">{t("citizensPage.addCitizen")}</LoadingButton>

            </div>

            {isLoading || isConfirming ? (
                <CardSkeleton></CardSkeleton>
            ) : (
                <>
                    <CitizenList citizens={citizens} />
                    {!!citizens?.length && <div className="flex justify-end mt-5">
                        <MaterialPagination onChange={(event: React.ChangeEvent<unknown>, page: number) => setPage(page)} count={Math.ceil(count / pagination.perPage)} />
                    </div>}
                </>
            )}
            {openDialog && <AddCitizenModal submit={(data: Citizen) => addCitizen(data)} openDialog={openDialog}
                hideDialog={() => setOpenDialog(false)} />}
        </div>
    );
}

export default CitizenListPage;
