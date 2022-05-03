class Activity {
	constructor({
		userStatus,
		nameTwo,
		groupId,
		isLook,
		type_,
		releaseNum,
		attendNum,
		activeType,
		logo,
		nameOne,
		startTime,
		id,
		endTime,
		status,
		nameFour,
		extraInfo = [],
		otherId = null,
		source = null,
	}) {
		this.userStatus = userStatus
		this.nameTwo = nameTwo
		this.groupId = groupId
		this.isLook = isLook
		this.type_ = type_
		this.releaseNum = releaseNum
		this.attendNum = attendNum
		this.activeType = activeType
		this.logo = logo
		this.nameOne = nameOne
		this.startTime = startTime
		this.id = id
		this.endTime = endTime
		this.status = status
		this.nameFour = nameFour
		this.extraInfo = extraInfo

		this.otherId = otherId
		this.source = source
	}
}

export default Activity