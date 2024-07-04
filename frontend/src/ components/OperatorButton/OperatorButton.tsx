import Layout from "../../Layout"
import "./OperatorButton.css"

type OperatorButtonProps = {
    operator: string
}

const OperatorButton: React.FC<OperatorButtonProps> = ({operator}) => {
    return (
        
        <div className="operator-button-container">
            <button>{operator}</button>
        </div>
        
    )
}

export default OperatorButton