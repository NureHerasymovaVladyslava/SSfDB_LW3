import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CoursePage from './components/course/CoursePage'
import ErrorProcedurePage from './components/course/ErrorProcedurePage'
import OddCoursesWithSalesPage from './components/course/OddCoursesWithSalesPage'
import StudentPage from './components/student/StudentPage'
import PurchasePage from './components/purchase/PurchasePage'
import TopicPage from './components/topic/TopicPage'
import CourseLogPage from './components/course_log/CourseLogPage'
import CourseBlockLogPage from './components/course_block_log/CourseBlockLogPage'
import Header from './components/Header'

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/course" element={<CoursePage />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/topic" element={<TopicPage />} />
                <Route path="/course_log" element={<CourseLogPage />} />
                <Route path="/course_block_log" element={<CourseBlockLogPage />} />
                <Route path="/table_function" element={<OddCoursesWithSalesPage />} />
                <Route path="/error_procedure" element={<ErrorProcedurePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;