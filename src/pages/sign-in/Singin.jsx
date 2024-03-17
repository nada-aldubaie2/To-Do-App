import Header from '../../comp/header'
import Footer from '../../comp/Footer'
import Modal from '../../shared/Modal'

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signin.css'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

const Signin = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [resetPass, setresetPass] = useState('')
  const [password, setpassword] = useState('')
  const [hasError, sethasError] = useState(false)
  const [firebaseError, setfirebaseError] = useState('')
  const [showSendEmail, setshowSendEmail] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const { i18n } = useTranslation()

  const signInBTN = async (eo) => {
    eo.preventDefault()
    setShowLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code

        sethasError(true)

        switch (errorCode) {
          case 'auth/operation-not-allowed':
            setfirebaseError("Unfortanitly you can't sign in  at this time")
            break

          case 'auth/invalid-email':
            setfirebaseError('Wrong Email')
            break

          case 'auth/user-not-found':
            setfirebaseError('Wrong Email')
            break

          case 'auth/wrong-password':
            setfirebaseError('Wrong Password')
            break

          case 'auth/too-many-requests':
            setfirebaseError('Too many requests, please try aganin later')
            break

          default:
            setfirebaseError('Please check your email & password')
            break
        }
      })
    setShowLoading(false)
  }

  // LEVEL3
  const [showModal, setshowModal] = useState(false)
  const forgotPassword = () => {
    setshowModal(true)
  }
  const closeModal = () => {
    setshowModal(false)
  }
  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        {showModal && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(eo) => {
                setresetPass(eo.target.value)
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault()

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    console.log('send email')
                    setshowSendEmail(true)
                  })
                  .catch((error) => {
                    // ..
                  })
              }}
            >
              {i18n.language === 'en' && ' Reset Password'}
              {i18n.language === 'ar' && 'تغيير كلمة المرور'}{' '}
            </button>
            {showSendEmail && (
              <p className="check-email">
                {i18n.language === 'en' &&
                  '  Please check your email to reset your password.'}
                {i18n.language === 'ar' &&
                  ' من فضلك تحقق من ايميلك لأعادة تعيين كلمة المرور'}
              </p>
            )}
          </Modal>
        )}

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value)
            }}
            required
            dir="auto"
            placeholder={
              i18n.language === 'en'
                ? 'Email: '
                : i18n.language === 'ar' && ': البريد الالكتروني'
            }
            type="email"
          />

          <input
            onChange={(eo) => {
              setpassword(eo.target.value)
            }}
            required
            placeholder={
              i18n.language === 'en'
                ? 'Password: '
                : i18n.language === 'ar' && ' :كلمة السر'
            }
            type="password"
          />

          <button
            onClick={(eo) => {
              signInBTN(eo)
            }}
          >
            {showLoading ? (
              <div className="flex" style={{ justifyContent: 'center' }}>
                <ReactLoading
                  type={'spin'}
                  color={'white'}
                  height={20}
                  width={20}
                />
              </div>
            ) : i18n.language === 'en' ? (
              'Sign in '
            ) : (
              i18n.language === 'ar' && ' تسجيل الدخول  '
            )}
          </button>
          <p className="account">
            {i18n.language === 'en' && "Don't hava an account"}
            {i18n.language === 'ar' && 'ليس لدي حساب '}
            <Link
              to="/signup"
            >
              {i18n.language === 'en' && 'Sign-up'}
              {i18n.language === 'ar' && 'إنشاء حساب'}
            </Link>
          </p>

          <p
            onClick={() => {
              forgotPassword()
            }}
            className="forgot-pass mtt"
          >
            {i18n.language === 'en' && 'Forgot password ?'}
            {i18n.language === 'ar' && ' نسيت كلمة المرور'}
          </p>

          {hasError && <h6 className="mtt">{firebaseError}</h6>}
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Signin
