import React from 'react'

const Feeback = ({feed}) => {
  return (
    <div className="modal fade" id="feedback" aria-hidden="true">
      <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Retroalimentación del profesor</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <textarea className="form-control" value={feed} readOnly></textarea>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Feeback
