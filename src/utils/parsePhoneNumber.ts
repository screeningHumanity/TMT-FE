const parsePhoneNumber = (num: string) => {
  return num
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(-{1,2})$/g, '')
}

const removeHyphens = (phoneNumber: string | undefined) => {
  return phoneNumber?.replace(/-/g, '')
}

export { parsePhoneNumber, removeHyphens }