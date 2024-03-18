import React from "react";

import { useTranslation } from "react-i18next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GroupIcon from "@mui/icons-material/Group";

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
    };
    return (
        <div className="flex mb-5 gap-6 items-center justify-center">

            <div className="flex gap-3 items-center">
                <GroupIcon sx={{ width: 56, height: 56 }} />
                <div>
                    <div className="font-semibold text-xl">{t("citizensPage.title")}</div>
                    <div>{t("citizensPage.desc")}</div>

                </div>

            </div>
            <ConnectButton />
            <button className="rounded p-2 w-fit bg-neutral-50  pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]" onClick={changeLanguage} >
                &#127760;

            </button>

        </div>
    );
};

export default Header;