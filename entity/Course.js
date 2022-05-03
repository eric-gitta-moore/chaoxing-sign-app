class Course {
	constructor({
		name,
		courseId,
		classId,
		img,
		summary,
		teacher,
		className,
		activities = []
	}) {
		this.name = name
		this.courseId = courseId
		this.classId = classId
		this.img = img
		this.summary = summary
		this.teacher = teacher
		this.className = className
		this.activities = activities
	}
}

export default Course
