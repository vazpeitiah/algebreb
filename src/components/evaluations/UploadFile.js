const UploadFile = ({images, uploadImages, isLoading}) => {

  const uploadFiles = (files) => {
    const arrayFiles = Array.from(files)
    if(arrayFiles.length !== 0) {
      const images = arrayFiles.map(file => {
        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', 'y4qkd5yt')
        return form
      })
      uploadImages(images)
    }
  }

  const clear = () => {
    uploadImages([])
  }

  return (
    <div className="modal fade" id="upload_file" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <form>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Subir archivos</h5>
          <button type="button" className={`btn-close${isLoading ? ' disabled' : '' }`} data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Suba capturas de sus procedimientos</label>
            <input type="file"
              className="form-control"  
              id="images"
              name="images"
              onChange={(e) => uploadFiles(e.target.files)}
              multiple
              disabled={isLoading}
              required/>
          </div>
          <h5>Imagenes subidas:</h5>
          {!isLoading ? (
            <div className="row">
              {images.map((img, index) => (
                <div className="col-md-4" key={index} >
                  <img src={img} width="200" height="200" className="border" alt={index+1} />
                </div>
              ))}
              {images.length === 0 && (<p>No se han cargado imagenes aún</p>)}
            </div>
          ) : (
            <div>
              Cargando...
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <input type="reset" className={`btn btn-danger${isLoading ? ' disabled' : '' }`} onClick={clear} value="Limpiar" />
          <button type="button" className={`btn btn-primary${isLoading ? ' disabled' : '' }`} data-bs-dismiss="modal">Guardar</button>
        </div>
      </div>
      </form>
      </div>
    </div>
  )
}

export default UploadFile
