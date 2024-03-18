import Card from "@/shared/components/Card/Card";
import { Citizen } from "@/shared/models/Citizen.model";
import { useState } from "react";
import CitizenDetailsModal from "../CitizenDetailsModal/CitizenDetailsModal";
interface Iprop {
    citizens?: Citizen[];
}
function CitizenList({ citizens }: Iprop) {
    const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const hideDialog = ()=>{
        setOpenDialog(false); 
        setSelectedCitizen(null);
    };
    const citizenDetails = (citizen:Citizen)=>{
        setSelectedCitizen(citizen);
        setOpenDialog(true);
    };

    return (
        <>
       { citizens?.length ? (
            <div className="grid w-full grid-cols-1 gap-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
                {citizens.map(citizen => <Card key={citizen?.id} onClick={() => citizenDetails(citizen)} citizen={citizen} />)}
            </div>
        ) : (<></>)}
        {openDialog && <CitizenDetailsModal openDialog={openDialog} citizen={selectedCitizen} hideDialog={() =>hideDialog()}></CitizenDetailsModal>}
        </>
    );
}

export default CitizenList;
