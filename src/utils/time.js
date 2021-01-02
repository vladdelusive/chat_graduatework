import { Timestamp } from 'db'
import moment from 'moment'

export const createTimestamp = () => Timestamp.now().toMillis().toString();

export const parseTimeFormatFromNow = timestamp => moment(parseInt(timestamp, 10)).fromNow();
export const parseTimeFormatExactTime = timestamp => moment(parseInt(timestamp, 10)).format('LT');