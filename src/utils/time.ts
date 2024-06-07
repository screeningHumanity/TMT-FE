function dateFormmating(dateTime: string) {
  const year = dateTime.substring(0, 4)

  const month = dateTime.substring(4, 6)

  const day = dateTime.substring(6, 8)

  const hour = dateTime.substring(8, 10)

  const minute = dateTime.substring(10, 12)

  return `${year}년 ${month}월${day}일 ${hour}시${minute}분`
}

export { dateFormmating }
