import Student from "../models/Student.js"

const getTeacherId = async (studentId) => {
  console.log('#STUDENTiD', studentId)

  const student = await Student.findOne({
    _id: studentId
  })

  let teacherId = student?.teacher.pop().toString() ?? studentId

  return teacherId
}

export default getTeacherId
