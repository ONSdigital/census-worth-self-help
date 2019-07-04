const moment = require("moment")

export const getTimeAgoPublished = time => {
  time = moment(time)
  if (time.isAfter()) {
    return "Just published"
  }
  return time.fromNow()
}
