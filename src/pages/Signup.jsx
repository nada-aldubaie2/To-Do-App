import Header from '../comp/header'
import Footer from '../comp/Footer'
import Loading from '../comp/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import Error404 from './error404'
import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

const Signup = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [hasError, sethasError] = useState(false)
  const [firebaseError, setfirebaseError] = useState('')
  const [userName, setuserName] = useState('')
  const [user, loading, error] = useAuthState(auth)

  const [showLoading, setShowLoading] = useState(false)
  const { i18n } = useTranslation()

  // Loading    (done)
  // NOT sign-in  (done)
  // sign-in without Email verification   (done)
  // (sign-in && verified email) => navigate(/)    (done)

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate('/')
      }
    }
  })
  //
  const signUpBTN = async (eo) => {
    eo.preventDefault()
    setShowLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        sendEmailVerification(auth.currentUser).then(() => {
          //
          console.log('Email verification sent!')
        })

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate('/')
          })
          .catch((error) => {
            console.log(error.code)
            // ...
          })

        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode)
        sethasError(true)

        switch (errorCode) {
          case 'auth/invalid-email':
            setfirebaseError('Wrong Email')
            break
          case 'auth/operation-not-allowed':
            setfirebaseError(
              "Unfortanitly you can't create an account at this time",
            )
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

  if (error) {
    return <Error404 />
  }

  if (loading) {
    return <Loading />
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main>
            <p>
              {' '}
              {i18n.language === 'en' &&
                'We send you an email to verify your Account'}
              {i18n.language === 'ar' && ' لقد ارسلنا اليك ايميل لتأكيد حسابك'}
            </p>
            <button className="delete">
              {' '}
              {i18n.language === 'en' && 'Send again'}
              {i18n.language === 'ar' && ' اعادة الارسال'}
            </button>
          </main>
          <Footer />
        </div>
      )
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: '23px', marginBottom: '22px' }}>
              {i18n.language === 'en' && '  Create a new account'}
              {i18n.language === 'ar' && 'انشاء حساب جديد'} <span>🤺</span>{' '}
            </p>

            <input
              onChange={(eo) => {
                setuserName(eo.target.value)
              }}
              required
              placeholder={
                i18n.language === 'en'
                  ? 'User name: '
                  : i18n.language === 'ar' && ' : اسم المستخدم'
              }
              type="text"
            />

            <input
              onChange={(eo) => {
                setemail(eo.target.value)
              }}
              required
              placeholder={
                i18n.language === 'en'
                  ? 'Email: '
                  : i18n.language === 'ar' && ' : البريد الالكتروني'
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
                signUpBTN(eo)
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
                'Sign up '
              ) : (
                i18n.language === 'ar' && ' انشاء الحساب  '
              )}
            </button>
            <p className="account">
              {i18n.language === 'en' && 'Already hava an account '}
              {i18n.language === 'ar' && ' لدي حساب بالفعل'}{' '}
              <Link to="/signin">
                {' '}
                {i18n.language === 'en' && 'Sign-in'}
                {i18n.language === 'ar' && ' تسجيل الدخول'}
              </Link>
            </p>

            {hasError && <h6 className="mtt">{firebaseError}</h6>}
          </form>
        </main>
        <Footer />
      </>
    )
  }
}

export default Signup
