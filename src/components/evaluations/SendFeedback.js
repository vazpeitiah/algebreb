import { useState, useEffect } from 'react'

const SendFeedback = ({exam, sendFeed}) => {
  const [feedback, setFeedback] = useState('')
  
  useEffect(() => {
    if(exam) {
      if(exam.feedback !== '') {
        setFeedback(exam.feedback)
      } else {
        setFeedback('')
      }
    } else {
      setFeedback('')
    }
  }, [exam])

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = {
      feedback,
      exam: exam.examData._id,
      student: exam.student._id, 
      grade: exam.grade, 
      answers: exam.answers,
      isActive: exam.isActive
    }

    sendFeed(exam._id, params)
    setFeedback('')
  }

  return (
    <div className="modal fade" id="send_feedback" aria-hidden="true">
      <div className="modal-dialog modal-xl">
      <form onSubmit={handleSubmit}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Retroalimentación del profesor</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <textarea className="form-control" 
            value={feedback} onChange={(e) => setFeedback(e.target.value)} rows="15">
          </textarea>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enviar</button>
        </div>
      </div>
      </form>
      </div>
    </div>
  )
}

export default SendFeedback
