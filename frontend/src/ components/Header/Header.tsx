import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <div className="quiz-header">
        <div>A</div>
        <h1>Quiz App</h1>

        <div className="login-icon">
          {
            localStorage.getItem('username') ? localStorage.getItem('username')?.charAt(0).toUpperCase() :
              <Link to='/auth'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={24} height={24} fill="white"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                </span>
              </Link>
          }

        </div>

      </div>
    </div>
  )
}

export default Header