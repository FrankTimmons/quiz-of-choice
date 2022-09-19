import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import QuizList from "./QuizList";
import NewQuizForm from "./NewQuizForm";

function QuizControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainQuizList, setMainQuizList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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
    // if (selectedTicket != null) {
    //   setFormVisibleOnPage(false);
    //   setSelectedTicket(null);
    //   setEditing(false);
    // } else {
    //   setFormVisibleOnPage(!formVisibleOnPage);
    // }
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

  let currentlyVisibleState = null;
  let buttonText = null; 

  if(error){
    currentlyVisibleState = <p>There was an error: {error}</p>
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewQuizForm onNewQuizCreation={handleAddingNewQuizToList}/>;
    buttonText = "Return to Ticket List"; 
  } else {
    currentlyVisibleState = <QuizList onQuizSelection={handleChangingSelectedQuiz} quizList={mainQuizList} />;
    buttonText = "Add Ticket"; 
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      {error ? null : <button onClick={handleClick}>{buttonText}</button>} 
    </React.Fragment>
  );
}

export default QuizControl;