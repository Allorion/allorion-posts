"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPostForm } from "../types/home.type";
import { useAddPost } from "../hooks/useAddPost";

interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalAddPostComponent: FC<IProps> = ({ open, setOpen }) => {

    const { register, handleSubmit, reset } = useForm<IPostForm>()
    const { mutate, isPending } = useAddPost()

    const handleClose = () => {
        setOpen(false);
        reset()
    };

    const onSubmit: SubmitHandler<IPostForm> = (data) => {

        const errors: string[] = []

        if (data.body === '') {
            errors.push('- Заполните поле "Текст поста"')
        }
        if (data.title === '') {
            errors.push('- Заполните поле "Заголовок поста"')
        }

        if (errors.length > 0) {
            alert(errors.join('\n'))
        } else {
            data.userId = 1
            mutate(data, { onSuccess: () => {
                handleClose()
            } })
        }
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="alert-dialog-title">
                        Форма создания нового поста
                    </DialogTitle>
                    <DialogContent>
                        <Stack direction={'column'} spacing={2} sx={{ marginTop: 2 }}>
                            <TextField
                                fullWidth={true}
                                label={'Заголовок поста'}
                                {...register('title')}
                            />
                            <TextField
                                fullWidth={true}
                                label={'Текст поста'}
                                {...register('body')}
                            />
                        </Stack>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color={'error'}>Отмена</Button>
                        <Button type="submit" color={'success'} disabled={isPending}>Сохранить</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Fragment>
    )
}

export default ModalAddPostComponent