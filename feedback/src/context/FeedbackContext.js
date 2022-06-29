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
        const response = await fetch('/feedback?_sort=id&_order=desc')
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }


    const addFeedback = async (newFeedBack) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(newFeedBack)
        })

        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' })
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

    const updatefeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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