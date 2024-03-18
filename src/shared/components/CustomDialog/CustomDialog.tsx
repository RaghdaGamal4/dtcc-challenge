import { styled } from "@mui/material/styles";
import { IconButton, DialogContent, DialogTitle, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ComponentProps } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    },
    "& .MuiDialog-paper": {
        borderRadius: "32px"
    }
}));
interface Iprop  extends ComponentProps<any> {
    hideTitle: boolean;
    openDialog: boolean;
    title: string;
    hideDialog: () => void;
}
export const CustomDialog = ({
    openDialog,
    hideDialog,
    hideTitle = false,
    title = "",
    ...props
}: Iprop) => {
    const handleClose = () => {
        hideDialog();
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                fullWidth
                maxWidth="sm"
                open={openDialog}
            >
                {!hideTitle && (
                    <DialogTitle
                        className="text-base text-[#004A92]"
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                    >
                        {title}
                    </DialogTitle>
                )}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>{props?.children}</DialogContent>
            </BootstrapDialog>
        </>
    );
};
