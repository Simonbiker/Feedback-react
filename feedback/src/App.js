import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackData from './data/FeedbackData';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import About from './pages/About';


function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const addFeedback = (newFeedBack) => {
    newFeedBack.id = uuidv4()
    setFeedback([newFeedBack, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path='/' element={
            <>
              <FeedbackForm handleAdd={addFeedback} />
              <FeedbackStats feedback={feedback} />
              <FeedbackList feedback={feedback}
                handleDelete={deleteFeedback} />
            </>
          }>
          </Route>

          <Route path='/about' element={<About />} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
