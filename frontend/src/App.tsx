import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OperatorButton from "./ components/OperatorButton/OperatorButton"
import './App.css'
import Layout from "./Layout"
import QuizPage from './ components/QuizPage/QuizPage';
import AuthForm from './ pages/auth/AuthForm';


const App = () => {
    return (


        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout>

                        <div className="quiz-app">

                            <Link to='/addition'><OperatorButton operator="+" /></Link>
                            <Link to='/subtraction'><OperatorButton operator="-" /></Link>
                            <Link to='/multiplication'><OperatorButton operator="*" /></Link>
                            <Link to='/division'><OperatorButton operator="/" /></Link>
                            
                            
                        </div>
                    </Layout>
                }
                />
                <Route path="/addition" element={<QuizPage operatorName='+' pageTitle="addition" />} />
                <Route path="/subtraction" element={<QuizPage operatorName='-' pageTitle="subtraction" />} />
                <Route path="/multiplication" element={<QuizPage operatorName='*' pageTitle="multiplication" />} />
                <Route path="/division" element={<QuizPage operatorName='/' pageTitle="division" />} />
                <Route path="/auth" element={<AuthForm />} />

            </Routes>
        </Router>

    )
}

export default App