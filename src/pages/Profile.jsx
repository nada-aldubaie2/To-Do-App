import Header from '../comp/header'
import Footer from '../comp/Footer'
import Loading from '../comp/Loading'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'
import Moment from 'react-moment'
import { deleteUser } from 'firebase/auth'
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const [user, loading, error] = useAuthState(auth)
  const { i18n } = useTranslation()

  const navigate = useNavigate()
  useEffect(() => {
    if (!user && !loading) {
      navigate('/')
    }

    if (user) {
      if (!user.emailVerified) {
        navigate('/')
      }
    }
  })

  const DeleteBTN = () => {
    deleteUser(user)
      .then(() => {
        //
        console.log('User deleted.')
      })
      .catch((error) => {
        // An error ocurred
        console.log(error.message)
      })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    )
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile</title>

          <style type="text/css">{` 
        main{
          flex-direction: column;
          align-items: flex-start;
  
    width: fit-content;
    margin: auto;
        }


        
        `}</style>
        </Helmet>
        <Header />

        <main>
          <h6 dir="auto">
            {i18n.language === 'en' && 'Email: '}
            {i18n.language === 'ar' && ' البريد الالكتروني:'} 
            &nbsp;{user.email}
          </h6>
          <h6 dir="auto">
            {' '}
            {i18n.language === 'en' && 'User Name: '}
            {i18n.language === 'ar' && '   اسم المستخدم:   '}
            &nbsp;
            {user.displayName}
          </h6>

          <h6 dir="auto">
            {i18n.language === 'en' && 'Last Sign-in : '}
            {i18n.language === 'ar' && 'آخر تسجيل دخول: '}
            &nbsp;
            <Moment fromNow date={user.metadata.lastSignInTime} />{' '}
          </h6>

          <h6 dir="auto">
            {i18n.language === 'en' && 'Account Created : '}
            {i18n.language === 'ar' && '   تاريخ إنشاء الحساب:  '}
            &nbsp;
            <Moment fromNow date={user.metadata.creationTime} />
          </h6>
          <button
            onClick={() => {
              DeleteBTN()
            }}
            className="delete"
            dir="auto"
          >
            {i18n.language === 'en' && 'Delete Account '}
            {i18n.language === 'ar' && ' حذف الحساب  '}
          </button>
        </main>
        <Footer />
      </>
    )
  }
}

export default Profile
