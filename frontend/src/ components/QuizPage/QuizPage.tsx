import React, { useEffect, useState } from 'react'
import './QuizPage.css'
import Layout from '../../Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'

type QuizPageProps = {
    operatorName: string
    pageTitle: string

}

const QuizPage: React.FC<QuizPageProps> = ({ operatorName, pageTitle }) => {
    const [storedScore, setStoredScore] = useState<number[]>([]);

    const renderItems = (items: number[]): React.ReactNode[] => {
        return items.map(item => {
            // Return a ReactNode, such as a JSX element
            return <div className='score-item' key={item}>{item} out of 10 </div>;
        });
    };

    const [questionData, setQuestionData] = useState({
        operand1: 5,
        operand2: 5,
        questionNumber: 1,
        score: {
            operatorSection: operatorName,
            scores: 0
        }
    })

    const [isQuizOver, setIsQuizOver] = useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null)


    const isCorrect = (operatorName: string, operand1: number, operand2: number): boolean => {
        function correctAnswer(): number {
            switch (operatorName) {
                case '+':
                    return operand1 + operand2
                case '-':
                    return operand1 - operand2
                case '*':
                    return operand1 * operand2
                case '/':
                    return operand1 / operand2
                default:
                    throw new Error(`Unsupported operator: ${operatorName}`);
            }
        };


        return correctAnswer() === Number(inputRef.current?.value)
    }





    const handleNextQuestion = () => {
        setQuestionData(
            {
                ...questionData,
                questionNumber: questionData.questionNumber === 10 ? 0 : questionData.questionNumber + 1,
                operand1: Math.floor(Math.random() * 100),
                operand2: Math.floor(Math.random() * 100),
                score: {
                    ...questionData.score,
                    scores: isCorrect(operatorName, questionData.operand1, questionData.operand2) ? questionData.score.scores + 1 : questionData.score.scores
                }
            }

        )

        if (inputRef.current) {
            inputRef.current.value = '';
        }

        console.log(questionData.score)
        // setIsQuizOver(questionData.questionNumber === 0)

    }
    //LOOK you  agin
    useEffect(() => {
        if (questionData.questionNumber === 0) {
            axios.post('http://localhost:3001/storescore', {
                username: localStorage.getItem('username'),
                score: questionData.score.scores,
                operator : operatorName
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [questionData.questionNumber])



    useEffect(() => {

        axios.get(`http://localhost:3001/score?username=${localStorage.getItem('username')}`, {

        })
            .then(response => {
                if (operatorName === '+') {
                    setStoredScore(response.data.additionScore)
                }
                else if (operatorName === '-') {
                    setStoredScore(response.data.subtractionScore)
                }
                else if (operatorName === '*') {
                    setStoredScore(response.data.multiplicationScore)
                }
                else if (operatorName === '/') {
                    setStoredScore(response.data.divisionScore)
                }
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])


    return (
        <Layout>
            <div className='question-container'>
                <div className='score-board'>
                    <div className="score-board-profile">
                        <div>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar"/>
                        </div>&nbsp;
                        <div>
                            <span>John Doe</span>
                        </div>
                    </div>
                    <div className="score-board-scores">
                        {
                            renderItems(storedScore)
                        }
                    </div>
                </div>
                <h3>{pageTitle}</h3>

                {
                    questionData.questionNumber === 0 ? <>
                        <div> You scored {questionData.score.scores} out of 10 </div>&nbsp;
                        <Link to='/'>
                            <button>Back To Home</button>
                        </Link>
                    </>
                        :
                        <>
                            <div className="question">
                                <span>Q{

                                    questionData.questionNumber
                                }.</span> &nbsp;
                                <span>{questionData.operand1}</span> &nbsp;
                                <span>{operatorName}</span> &nbsp;
                                <span>{questionData.operand2}</span> &nbsp;
                                <span>=</span> &nbsp;
                                <input ref={inputRef} type="number" placeholder='enter answer' />
                            </div>&nbsp;

                            <button onClick={handleNextQuestion}>
                                Next
                            </button>
                        </>
                }
            </div>
        </Layout>
    )
}



export default QuizPage