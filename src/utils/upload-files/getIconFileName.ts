import { appIcons } from '@/config/icons'

export const getIconFileName = (fileName: string) => {
  const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
  switch (fileExtension) {
    case '.pdf':
      return appIcons.fileText
    case '.doc':
    case '.docx':
      return appIcons.fileText
    case '.xlsx':
      return appIcons.spreadsheet

    default:
      return appIcons.file
  }
}
