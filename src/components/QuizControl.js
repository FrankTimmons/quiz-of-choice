import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "./../firebase.js";
import QuizList from "./QuizList";
import NewQuizForm from "./NewQuizForm";
import QuizDetail from "./QuizDetail";
import EditQuizForm from "./EditQuizForm.js";
import MyQuizList from "./MyQuizList.js";

function QuizControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainQuizList, setMainQuizList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [viewMyQuizList, setViewMyQuizList] = useState(false);

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
    setCurrentAnswer(newAnswerData);
    setFormVisibleOnPage(false);
    setSelectedQuiz(null);
    // logic to show a component that has the correct answers for the quiz you just took, and shows your answers alongside them.
  }

  const handleDeletingQuiz = async (id) => {
    await deleteDoc(doc(db, "quizzes", id));
    setSelectedQuiz(null);
  }

  const handleEditingQuizInList = async (quizToEdit) => {
    const quizRef = doc(db, "quizzes", quizToEdit.id);
    await updateDoc(quizRef, quizToEdit);
    setEditing(false);
    setSelectedQuiz(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleChangingQuizList = () => {
    setViewMyQuizList(!viewMyQuizList);
  }
  
  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access Quizzes</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    console.log(auth.currentUser);

    let currentlyVisibleState = null;
    let buttonText = null; 
    
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (currentAnswer != null){
      // set currentlyvisiblestate to answer key component. Pass the current answer and quiz down as props so we can compare them, and display them.
    } else if (editing) {      
      currentlyVisibleState = <EditQuizForm quiz={selectedQuiz} onEditQuiz={handleEditingQuizInList} />
      buttonText = "Return to Quiz List";
    } else if (selectedQuiz != null) {
      currentlyVisibleState= <QuizDetail
      quiz={selectedQuiz} 
      onClickingDelete={handleDeletingQuiz}
      onClickingEdit = {handleEditClick} 
      onNewAnswerCreation = {handleAddingNewAnswerToList} />
      buttonText = "Return to quiz List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewQuizForm onNewQuizCreation={handleAddingNewQuizToList}/>;
      buttonText = "Return to Quiz List"; 
    } else if (viewMyQuizList){
      currentlyVisibleState = <MyQuizList onQuizSelection={handleChangingSelectedQuiz} quizList={mainQuizList} changeVisibleList={handleChangingQuizList}/>;
      buttonText = "Add Quiz";
    } else {
      currentlyVisibleState = <QuizList onQuizSelection={handleChangingSelectedQuiz} quizList={mainQuizList} changeVisibleList={handleChangingQuizList}/>;
      buttonText = "Add Quiz"; 
    }
  
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>} 
      </React.Fragment>
    );   
  }
}

export default QuizControl;