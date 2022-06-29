import { v4 as uuidv4 } from 'uuid';
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => { fetchFeedback() }, [])

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }


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
        isLoading, // Spinner boolean
        deleteFeedback,
        addFeedback,
        editFeedback, //function that picks the card to edit
        updatefeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext