import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This feedback item 2',
            rating: 7
        },
        {
            id: 3,
            text: 'This feedback item 3',
            rating: 10
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })


    const addFeedback = (newFeedBack) => {
        newFeedBack.id = uuidv4()
        setFeedback([newFeedBack, ...feedback])
    }

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    //This will set item to be updated.
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updatefeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
        )
    }


    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit, // The state we are changing. The form needs to know the item.
        deleteFeedback,
        addFeedback,
        editFeedback, //function that picks the card to edit
        updatefeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext