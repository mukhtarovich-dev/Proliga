import { BasePlugin } from '@uppy/core'

export default class UppyServerActionUpload extends BasePlugin {
  constructor(uppy, opts) {
    super(uppy, opts)
    this.id = opts?.id || 'UppyServerActionUpload'
    this.type = 'uploader'
    if (opts === undefined) {
      throw new Error(
        'UppyServerActionUpload requires an action function to be passed in the options'
      )
    }
    this.action = opts.action
    this.subDir = opts.subDir || 'sub-directory'
    this.dir = opts.dir || 'directory'
    this.handleUpload = this.handleUpload.bind(this)
  }
  async handleUpload(fileIDs) {
    const { uppy } = this
    const files = fileIDs.map((fileID) => uppy.getFile(fileID))
    const formData = new FormData()
    formData.append('dir', this.dir)
    formData.append('subDir', this.subDir)
    files.forEach((file) => {
      formData.append('files', file.data, file.name)
    })
    this.uppy.emit('upload-started', files)
    await this.action(formData)
    this.uppy.emit('upload-success', files)
    return Promise.resolve()
  }
  install() {
    this.uppy.addUploader(this.handleUpload)
  }
  uninstall() {
    this.uppy.removeUploader(this.handleUpload)
  }
}
