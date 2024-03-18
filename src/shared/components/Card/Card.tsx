import { Citizen } from "@/shared/models/Citizen.model";

import { Avatar, ListItemAvatar } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Iprop {
    citizen?: Citizen;
    onClick: () => void
}
function Card({ citizen, onClick }: Iprop) {
    const { t } = useTranslation();

    return (
        <div onClick={onClick && onClick} className={`cursor-pointer w-full relative flex flex-col ${onClick ? "shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300":""}`} >
            <div className="flex justify-center items-center">
                <ListItemAvatar>
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        alt={citizen?.name}
                    >
                        {citizen?.name.charAt(0).toUpperCase()}
                    </Avatar>
                </ListItemAvatar>
            </div>
            <div className="bg-white py-4 px-3">
                <h3 className="text-lg text-center mb-3 font-medium">{citizen?.name}</h3>
                <div className="flex flex-col justify-between items-center">
                    <p className="text-xs text-gray-400 mb-2">
                        <span className="text-md text-center mb-2 font-medium text-black">{t("citizensPage.age")}:</span> {citizen?.age}
                    </p>
                    <p className="text-xs text-gray-400  mb-2">
                        <span className="text-md text-center mb-2 font-medium text-black">{t("citizensPage.city")}:</span> {citizen?.city}
                    </p>
                    {citizen?.note && <p className="text-xs text-gray-400">
                        <span className="text-md text-center mb-2 font-medium text-black">{t("citizensPage.note")}:</span> {citizen?.note}
                    </p>}
                </div>
            </div>
        </div>
    );
}
export default Card;
