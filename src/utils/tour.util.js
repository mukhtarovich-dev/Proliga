export const TOUR_STATUS = {
  inProcess: 'in_process',
  completed: 'completed',
  notStartedTransfer: 'not_started_transfer',
  notStarted: 'not_started',
}

export const getTourName = (status, t) => {
  switch (status) {
    case TOUR_STATUS.notStarted:
      return t('Boshlanmagan')
    case TOUR_STATUS.completed:
      return t('Tugagan')
    case TOUR_STATUS.notStartedTransfer:
      return t('Boshlanmagan transfer mumkin')
    case TOUR_STATUS.inProcess:
      return t('Jarayonda')
    default:
      return 'Unidentified Status'
  }
}
