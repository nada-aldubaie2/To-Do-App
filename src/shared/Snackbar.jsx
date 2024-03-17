import i18n from 'i18n'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Snackbar = ({ showMessage }) => {
  const { i18n } = useTranslation()

  return (
<>
      <Helmet>
        <style type="text/css">
          {`
        .show-message{
          background-color: whitesmoke;
          border-radius: 5px;
          font-size: 18px;
          color: #1b1b1b;
          padding: 8px 12px;
          font-weight: normal;
          position: fixed;
          top: 100px;
          transition: 1s;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          -o-border-radius: 5px;
          -webkit-transition: 1s;
          -moz-transition: 1s;
          -ms-transition: 1s;
          -o-transition: 1s;
        }
        .home .fa-circle-check{
          color: rgb(30, 200, 200);
          margin-left: 5px;
        }
        }
      `}
        </style>
      </Helmet>
      <p     style={{ right: showMessage ? '20px' : '-100vw' }}
      className="show-message">
  
        {i18n.language===('en') && '  Task message'}
        {i18n.language===('ar') && 'المهمة'}
        <i className="fa-regular fa-circle-check" />
      </p>
</>
  )
}

export default Snackbar
