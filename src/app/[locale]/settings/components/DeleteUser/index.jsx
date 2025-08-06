import { useTranslation } from 'react-i18next'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from 'components/ui/card'
import { Button } from 'components/ui/button'
import ConfirmationModal from 'components/ConfirmationModal'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { supabase } from 'lib/supabaseClient'
import { toast } from 'sonner'
import { useLogOut } from 'hooks/auth/useLogOut'

const DeleteUser = () => {
    const { t } = useTranslation()
    const user = useSelector(selectUser)
    const [isModalOpen, setModalOpen] = useState(false)
    const { logOut } = useLogOut()

    const handleDelete = async () => {
        if (!user?.id) return
        try {
            await supabase
                .from('user')
                .update({ deleted_at: new Date().toISOString(), phone: "deleted_" + user.phone, email: 'deleted_' + user.email })
                .eq('id', user.id)
                .single()

            toast.success(t('Account deleted'))
            await logOut({ showMessage: false })
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : t('An unknown error occurred')
            )
        } finally {
            setModalOpen(false)
        }
    }

    return (
        <Card className="flex w-full flex-col gap-4 px-4 ">
            <ConfirmationModal
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                onConfirm={handleDelete}
                onCancel={() => setModalOpen(false)}
            />
            <CardHeader className={"flex items-center justify-between p-0"}>
                <CardTitle className="flex items-center gap-2">
                    {t('Account deletion')}
                </CardTitle>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-destructive text-destructive hover:bg-destructive/10 hover:text-foreground"
                    onClick={() => setModalOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardDescription>
                {t('Deleting your account. This action cannot be undone.')}
            </CardDescription>
        </Card>
    )
}

export default DeleteUser
