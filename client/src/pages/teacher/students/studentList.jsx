import { useEffect, useState } from "react";
import { NavigationTeacher } from "../navigationTeacher";
export const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const url = "/api/auth/students";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      setStudents(data);
    }
    getStudents();
  }, []);

  return (
    <>
      <NavigationTeacher />
      <div
        style={{
          marginLeft: "200px",
          fontSize: "20px",
        }}
      >
        <h2>Список учеников:</h2>
        <ul style={{ listStyle: "auto" }}>
          {students.map((student, index) => (
            <li key={index}>
              {student.lastName} {student.firstName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
