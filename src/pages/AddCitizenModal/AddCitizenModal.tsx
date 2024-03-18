

import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CustomDialog } from "@/shared/components/CustomDialog/CustomDialog";
import { Citizen } from "@/shared/models/Citizen.model";
import { useTranslation } from "react-i18next";

interface Iprop {
    openDialog: boolean;
    hideDialog: () => void;
    submit: (data: Citizen) => void;
}
function AddCitizenModal({ openDialog, hideDialog, submit }: Iprop) {
    const { t } = useTranslation();
    
    // form setup
    const { control, handleSubmit, formState: { errors, isValid }, } = useForm({
        defaultValues: {
            age: "",
            city: "",
            name: "",
            note: ""
        },

        mode: "all"
    });
    return (

        <CustomDialog hideDialog={hideDialog} openDialog={openDialog}>
            <div className="relative flex  items-baseline">
                <span className="me-2 flex-shrink text-xl font-medium text-[#004A92]">
                    {t("citizensPage.addCitizen")}
                </span>
                <div className="flex-grow border-b border-dashed border-[#CFD1D4]"></div>
            </div>
            <form
                onSubmit={handleSubmit((data) => {
                    submit(data);
                    hideDialog();
                })}
                className="mt-4"
            >


                <div className="mb-3 grid grid-cols-2 w-full gap-x-6 gap-y-3">
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t("addCitizen.nameValidation"),
                            },

                        }}
                        render={({ field }) => (
                            <TextField
                                label={t("citizensPage.name")}
                                error={errors.name}
                                helperText={errors.name?.message}
                                type="text"


                                {...field}

                            />
                        )}
                    />
                    {/* age */}
                    <Controller
                        name="age"
                        control={control}
                        rules={{
                            validate: (value) =>
                                value >= 18 && value < 150
                                    ? true
                                    : t("addCitizen.ageValidation"),
                            onChange(e) {
                                e.target.value = Math.abs(e.target.value);
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                label={t("citizensPage.age")}
                                error={errors.age}
                                helperText={errors.age?.message}
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 18,
                                        max: 150
                                    }
                                }}
                                {...field}

                            />
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t("addCitizen.enterYourCity")
                            },

                        }}
                        render={({ field }) => (
                            <TextField
                                label={t("citizensPage.city")}
                                error={errors.city}
                                helperText={errors.city?.message}
                                type="text"


                                {...field}

                            />
                        )}
                    />
                </div>
                <Controller
                    name="note"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: t("addCitizen.enterYourNote")
                        }
                    }}
                    render={({ field }) => (
                        <TextField
                            label={t("addCitizen.enterYourNote")}
                            multiline
                            rows={3}
                            className="w-full"
                            inputProps={{ maxLength: 1000 }}
                            error={Boolean(errors.note)}
                            helperText={errors.note?.message}
                            {...field}
                        />
                    )}
                />
                <hr className="mb-6" />
                <div className="flex justify-end gap-4">
                    <Button variant="outlined" size="large" onClick={hideDialog}>
                    {t("addCitizen.cancel")}

                    </Button>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={!isValid}
                    >
                        {t("addCitizen.save")}
                    </LoadingButton>
                </div>
            </form>
        </CustomDialog>
    );
}

export default AddCitizenModal;
