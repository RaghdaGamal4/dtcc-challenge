

import { CustomDialog } from "@/shared/components/CustomDialog/CustomDialog";
import { Citizen } from "@/shared/models/Citizen.model";
import { useTranslation } from "react-i18next";
import { contractAbi, contractAddress } from "@/shared/constants/index";
import { useAccount, useReadContract } from "wagmi";
import Card from "@/shared/components/Card/Card";
import PageLoading from "@/shared/components/PageLoading/PageLoading";

interface Iprop {
    openDialog: boolean;
    citizen: Citizen;
    hideDialog: () => void;
}
function CitizenDetailsModal({ openDialog, citizen, hideDialog }: Iprop) {
    const { t } = useTranslation();
    const { address } = useAccount();

    const { data: citizenNote, isLoading: citizenNoteLoading } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getNoteByCitizenId",
        account: address,
        args: [citizen.id],
    });

    return (

        <CustomDialog hideDialog={hideDialog} openDialog={openDialog}>
            <div className="relative flex mb-4 items-baseline">
                <span className="me-2 flex-shrink text-xl text-center font-medium text-primary">
                    {t("citizensPage.citizenDetails")}
                </span>
                <div className="flex-grow border-b border-dashed border-[#CFD1D4]"></div>
            </div>
            {citizenNoteLoading ? <PageLoading></PageLoading> : <Card citizen={{ ...citizen, note: citizenNote }}></Card>}

        </CustomDialog>
    );
}

export default CitizenDetailsModal;
