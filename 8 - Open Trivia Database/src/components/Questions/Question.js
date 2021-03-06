import { nanoid } from "nanoid";
import { decode } from "html-entities";
import React, { useState, useEffect } from "react";

export default function Question(props) {

	const incorrectAnswersElements = props.incorrectAnswers.map(answer => {
		const incorrectAnswerClassName = `
			${props.selectedAnswer === answer ? "question-btn-selected" : "question-btn"}
			${(props.showAnswer && props.selectedAnswer === answer) && "question-btn-incorrect"}
		`;
		return <button
			key={nanoid()}
			className={incorrectAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, answer)}
		>
			{ decode(answer) }
		</button>
	});
    
    const [sortAnswersArray, setSortAnswersArray] = useState(true);

	useEffect(() => setSortAnswersArray(false), []);

	const correctAnswerClassName = `
		${props.selectedAnswer === props.correctAnswer ? "question-btn-selected" : "question-btn"}
		${props.showAnswer && "question-btn-correct"}
	`;

	const correctAnswerElement =
		<button
			key={nanoid()}
			className={correctAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
		>
			{ decode(props.correctAnswer) }
		</button>
	
	incorrectAnswersElements.push(correctAnswerElement);

	const answersElements = incorrectAnswersElements.sort((a,b) => (
		a.props.children.localeCompare(b.props.children))
		);

	return (
		<article className="question-container">
			<h3 className="question-text">{ decode(props.question) }</h3>
			{ answersElements }
		</article>
	);
}
