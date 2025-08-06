'use client'

import '@uppy/dashboard/dist/style.min.css'
import '@uppy/core/dist/style.min.css'

import Russian from '@uppy/locales/lib/ru_RU'
import Uzbek from '@uppy/locales/lib/uz_UZ'
import Uppy from '@uppy/core'
import mime from 'mime'
import UppyServerActionUpload from 'plugins/UploadFile/UppyServerActionUpload'
import { Dashboard } from '@uppy/react'
import { useSelector } from 'react-redux'
import { useState, useMemo, useEffect } from 'react'
import { saveFile } from 'actions/saveFile.action'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useUpdateUserPhoto } from 'hooks/user/useUpdateUserPhoto'
import { selectUser } from 'lib/features/auth/auth.selector'

export const UppyUploader = ({ closeModal }) => {
  const { lang } = useSelector((state) => state.systemLanguage)
  const user = useSelector(selectUser)
  const { updateUserPhoto } = useUpdateUserPhoto()
  const [fileType, setFileType] = useState('')
  const dir = 'user'
  const subDir = useMemo(() => user?.id.toString() || '', [user])
  const path = useMemo(
    () => `/${dir}/${subDir}/image.${fileType}`,
    [dir, subDir, fileType]
  )

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      allowMultipleUploadBatches: false,
      locale: getCorrectName({ lang, uz: Uzbek, ru: Russian }),
      restrictions: {
        maxFileSize: 5 * 1024 * 1024, // 5 mb
        allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
      },
    }).use(UppyServerActionUpload, {
      action: saveFile,
      dir,
      subDir,
    })
  )

  useEffect(() => {
    uppy.on('file-added', async (result) => {
      setFileType(mime.getExtension(result.data.type))
    })
  }, [uppy])

  useEffect(() => {
    if (fileType && path) {
      uppy.on('upload-success', async () => {
        await updateUserPhoto({ path, cb: () => closeModal(), user })
      })
    }
  }, [uppy, path, fileType, user, closeModal, updateUserPhoto])

  return <Dashboard className="w-full rounded-xl" theme="dark" uppy={uppy} />
}
