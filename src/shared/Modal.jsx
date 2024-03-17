import { Helmet } from 'react-helmet-async'

const Modal = ({ closeModal, children,BackgroundColor=" whitesmoke"}) => {
  return (
    <>
      <div className="parent-of-model">
        <Helmet>
          <style type="text/css">
          {`
           .parent-of-model{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            }
            .close .fa-xmark{
              font-size: 29px;
              color: #444;
              position: absolute;
              top: 17px;
              right: 22px;
            }
            
            .close .fa-xmark:hover{
              color: orange;
              font-size: 30px;
              transform: rotate(180deg);
              transition: 0.3s;
            }
            .modal{
            width: 400px;
            height: 333px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            animation: modalMove 0.8s
            overflow-y: scroll;
            }
            @keframe modalMove{
              0%
              {scale:0; transform:translateY(-100vh);}
              100%
              {scale:1; transform:translateY(0);}
            }
          `}
          </style>
        </Helmet>

        <form style={{  backgroundColor: BackgroundColor}} className={`modal`}>
          <div
            onClick={() => {
              closeModal(false)
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          {children}
        </form>
      </div>
    </>
  )
}

export default Modal;
