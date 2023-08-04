import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ShowSubjects from './subject/ShowSubjects';
import SubjectForm from './subject/SubjectForm';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SubjectEdit from './subject/SubjectEdit';
import SubjectDetails from './subject/SubjectDetails';
import ShowStudents from './student/ShowStudents'
import StudentForm from './student/StudentForm'
import StudentEdit from './student/StudentEdit'
import StudentDetails from './student/StudentDetails'
import Login from './Login';
import Pocetna from './Pocetna';
import { check_login } from './login_logic';
import ProtectedRoute from './ProtectedRoute';
import Error from './Error';

// Isidora Havlović 
// git: https://github.com/havlisi/project_dnevnik

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children : [
      {
        path:'pocetna',
        element: <Pocetna/>
      },
      {
        path:'error',
        element: <Error/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'subjects',
        element:<ProtectedRoute><ShowSubjects/></ProtectedRoute>
      },
      {
        path:'subjects/new_subject',
        element:<ProtectedRoute><SubjectForm/></ProtectedRoute>
      },
      {
        path:'subjects/edit_subject/:id',
        element:<SubjectEdit/>,
        loader: async ({ params }) => {
          const user = check_login(['ROLE_ADMIN']);
          return fetch(`http://localhost:8080/api/project/subject/${params.id}`, {
            method: 'GET',
              headers: {
                Authorization : user.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
              }
          })
        },
      },
      {
        path:'subjects/subject_details/:id',
        element:<SubjectDetails/>,
        loader: async ({ params }) => {
          const user = check_login(['ROLE_ADMIN', 'ROLE_PARENT', 'ROLE_STUDENT', 'ROLE_TEACHER']);
          return fetch(`http://localhost:8080/api/project/subject/${params.id}`, {
              method: 'GET',
              headers: {
                Authorization : user.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
              }
            });
        }
      },
      {
        path:'students',
        element:<ProtectedRoute><ShowStudents/></ProtectedRoute>
      },
      {
        path:'students/new_student',
        element:<ProtectedRoute><StudentForm/></ProtectedRoute>
      },
      {
        path:'students/edit_student/:id',
        element:<StudentEdit/>,
        loader: async ({ params }) => {
          const user = check_login(['ROLE_ADMIN']);
          return fetch(`http://localhost:8080/api/project/student/by-id/${params.id}`, {
              method: 'GET',
              headers: {
                Authorization : user.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
              }
            });
        }
      },
      {
        path:'students/student_details/:id',
        element:<StudentDetails/>,
        loader: async ({ params }) => {
          const user = check_login(['ROLE_ADMIN']);
          return fetch(`http://localhost:8080/api/project/student/by-id/${params.id}`, {
              method: 'GET',
              headers: {
                Authorization : user.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
              }
            });
      },
    }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
