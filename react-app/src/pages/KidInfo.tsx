// @ts-nocheck
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../config'; // 請確保路徑正確

interface Student {
  StudentID: number;
  FirstName: string;
  LastName: string;
  Birthdate: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以加1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

const KidInfo: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    StudentID: 0,
    FirstName: '',
    LastName: '',
    Birthdate: ''
  });

  useEffect(() => {
    axios.get(API.USERS.GET_STUDENTS, { withCredentials: true,headers: {
      'ngrok-skip-browser-warning': 'true'
    } })
      .then(response => {
        const formattedStudents = response.data.map((student: Student) => ({
          ...student,
          Birthdate: formatDate(student.Birthdate)
        }));
        setStudents(formattedStudents);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleSave = () => {
    if (editingStudent) {
      const updatedStudent = {
        ...editingStudent,
        Birthdate: parseDate(editingStudent.Birthdate)
      };
      axios.put(API.USERS.UPDATE_STUDENT(editingStudent.StudentID), updatedStudent, { withCredentials: true })
        .then(response => {
          setStudents(students.map(student => student.StudentID === editingStudent.StudentID ? { ...editingStudent, Birthdate: formatDate(editingStudent.Birthdate) } : student));
          setEditingStudent(null);
        })
        .catch(error => {
          console.error('There was an error updating the student!', error);
        });
    }
  };

  const handleAdd = () => {
    const newStudentData = {
      ...newStudent,
      Birthdate: parseDate(newStudent.Birthdate)
    };
    axios.post(API.USERS.ADD_STUDENT, newStudentData, { withCredentials: true })
      .then(response => {
        setStudents([...students, { ...response.data, Birthdate: formatDate(response.data.Birthdate) }]);
        setNewStudent({ StudentID: 0, FirstName: '', LastName: '', Birthdate: '' });
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [name]: value });
    } else {
      setNewStudent({ ...newStudent, [name]: value });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Kid Information</h2>
      {students.length === 0 ? (
        <p>No kid data available, please add new ones.</p>
      ) : (
        students.map(student => (
          <div key={student.StudentID} className="card">
            {editingStudent && editingStudent.StudentID === student.StudentID ? (
              <div>
                <input
                  type="text"
                  name="FirstName"
                  value={editingStudent.FirstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="LastName"
                  value={editingStudent.LastName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="Birthdate"
                  value={editingStudent.Birthdate}
                  onChange={handleInputChange}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingStudent(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{student.FirstName} {student.LastName}</p>
                <p>{student.Birthdate}</p>
                <button onClick={() => handleEdit(student)}>Edit</button>
              </div>
            )}
          </div>
        ))
      )}
      <h3>Add New Student</h3>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="FirstName"
            value={newStudent.FirstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="LastName"
            value={newStudent.LastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </label>
        <label>
          Birthdate (DD/MM/YYYY):
          <input
            type="text"
            name="Birthdate"
            value={newStudent.Birthdate}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
          />
        </label>
        <button onClick={handleAdd}>Add Student</button>
      </div>
    </div>
  );
};

export default KidInfo;
