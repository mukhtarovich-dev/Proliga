import { getPage } from 'actions/getHTMLPage.action'
import { getCorrectName } from 'utils/getCorrectName.util'

const DeleteInfoPage = async ({ params }) => {
    const { locale } = await params
    const { data, error } = await getPage('delete-info')

    if (error) {
        return <div>{error?.message}</div>
    }

    return (
        <div
            className="html-page shadow-muted-foreground/50 bg-card my-6 min-h-[40vh] w-full rounded-xl px-2 py-4 text-sm shadow-lg sm:p-4 md:p-6 xl:text-base"
            dangerouslySetInnerHTML={{
                __html: getCorrectName({ lang: locale, ru: data?.ru, uz: data?.uz }),
            }}
        />
    )
}

export default DeleteInfoPage
