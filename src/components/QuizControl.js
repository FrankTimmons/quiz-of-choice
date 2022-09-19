import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import QuizList from "./QuizList";
import NewQuizForm from "./NewQuizForm";
import QuizDetail from "./QuizDetail";

function QuizControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainQuizList, setMainQuizList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "quizzes"),
      (collectionSnapshot) => {
        const quizzes = [];
        collectionSnapshot.forEach((doc) => {
          quizzes.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setMainQuizList(quizzes);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    setFormVisibleOnPage(!formVisibleOnPage);
    if (selectedQuiz != null) {
      setFormVisibleOnPage(false);
      setSelectedQuiz(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewQuizToList = async (newQuizData) => {
    const collectionRef = collection(db, "quizzes");
    await addDoc(collectionRef, newQuizData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedQuiz = (id) => {
    const selection = mainQuizList.filter(quiz => quiz.id === id)[0];
    setSelectedQuiz(selection);
  }

  const handleAddingNewAnswerToList = async (newAnswerData) => {
    const collectionRef = collection(db, "answers");
    await addDoc(collectionRef, newAnswerData);
    setFormVisibleOnPage(false);
    setSelectedQuiz(null);
  }

  let currentlyVisibleState = null;
  let buttonText = null; 

  if(error){
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (selectedQuiz != null) {
    currentlyVisibleState= <QuizDetail
    quiz={selectedQuiz} 
    // onClickingDelete={handleDeletingquiz}
    // onClickingEdit = {handleEditClick} 
    onNewAnswerCreation = {handleAddingNewAnswerToList} />
    buttonText = "Return to quiz List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewQuizForm onNewQuizCreation={handleAddingNewQuizToList}/>;
    buttonText = "Return to Quiz List"; 
  } else {
    currentlyVisibleState = <QuizList onQuizSelection={handleChangingSelectedQuiz} quizList={mainQuizList} />;
    buttonText = "Add Quiz"; 
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      {error ? null : <button onClick={handleClick}>{buttonText}</button>} 
    </React.Fragment>
  );
}

export default QuizControl;