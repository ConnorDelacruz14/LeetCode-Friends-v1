import { useState } from 'react';
import './Question.css';

type Props = {
    number: number;
    name: string;
    complete: boolean;
    delete: (index: number) => void;
    index: number;
}

const Question: React.FC<Props> = ({index, number, name, complete, delete: deleteQuestion}) => {
    const [completeQuestion, setCompleteQuestion] = useState(complete);
    
    const toggleComplete = () => setCompleteQuestion(!completeQuestion);

    return (
    <div className='question'>
        <div className='number-name'>
            <div className="checkmark" onClick={toggleComplete}>
                {completeQuestion ? "✓" : ""}
            </div>
            <h4 className={`question-number ${completeQuestion ? 'question-complete' : ''}`}>{number}.</h4>
            <div className={`question-name ${completeQuestion ? 'question-complete' : ''}`}>{name}</div>
        </div>
        <div className="question-delete" onClick={() => {deleteQuestion(index)}}>X</div>
    </div>
    );
}

export default Question;
