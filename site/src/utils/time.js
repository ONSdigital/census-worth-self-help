const moment = require("moment")

const minimumGapInMinutes = 15

export const getTimeAgoPublished = time => {
  time = moment(time)
  if (time.isAfter()) {
    return "Just published"
  }
  return time.fromNow()
}

export class LastVisitManager {
  constructor() {
    try {
      this.localStorage = localStorage
      this.lastVisitTime = this.localStorage.getItem("lastVisitTime") ?
      	moment(this.localStorage.getItem("lastVisitTime")) :
      	moment(0)
      this.currentVisitTime = this.localStorage.getItem("currentVisitTime") ?
      	moment(this.localStorage.getItem("currentVisitTime")) :
      	false
    } catch (exception) {
      this.localStorage = false
    }
  }

  updateVisitTime() {
  	if(this.localStorage) {
  		// if it's been longer than the minimum gap time we consider it a new visit.
    	if (this.currentVisitTime && moment(this.currentVisitTime).add(minimumGapInMinutes, 'minute').isBefore()) {
    		this.lastVisitTime = this.currentVisitTime
    		this.localStorage.setItem("lastVisitTime", this.lastVisitTime.format())
    	}
    	this.currentVisitTime = moment()
    	this.localStorage.setItem("currentVisitTime", this.currentVisitTime.format())
	}
  }

  getEdgesChangedSinceLastVist(edges) {
  	return edges.filter( edge => {
  		return moment(edge.node.frontmatter.date).isAfter(this.lastVisitTime)
  	})
  }
}
