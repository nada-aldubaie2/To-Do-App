import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import './Home.css'
import HomeModal from './HomeModal'
import AllTasksSection from './AllTasksSection'
import { useTranslation } from 'react-i18next'
import Error404 from "pages/error404";
import Snackbar from "shared/Snackbar";

const Home = () => {
  const { i18n } = useTranslation();

  const [user, loading, error] = useAuthState(auth)
  //console.log(user)

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log('Email verification sent!')
      // ...
    })
  }


  //==================================
  //     Functions of Modal
  //=================================
  const [taskArr, setTaskArr] = useState([])
  const [subTask, setSubTask] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [showModal, setshowModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showMessage, setshowMessage] = useState(false)


  const closeModal = () => {
    setshowModal(false)
    setTaskTitle('')
    setTaskArr([])
  }
  const titleInput = (eo) => {
    setTaskTitle(eo.target.value)
  }
  const detailsInput = (eo) => {
    setSubTask(eo.target.value)
  }
  const addBTN = (eo) => {
    eo.preventDefault()

    if (!taskArr.includes(subTask)) {
      taskArr.push(subTask)
    }
    console.log(taskArr)
    setSubTask('')
  }
  const submitBTN = async (eo) => {
    eo.preventDefault()
    setShowLoading(true)
    console.log('wating📨............')
    const taskId = new Date().getTime()
    await setDoc(doc(db, user.uid, `${taskId}`), {
      id: taskId,
      title: taskTitle,
      tasks: taskArr,
      completed: false,
    })
    console.log('done✔️............')
    setShowLoading(false)
    setTaskTitle('')
    setTaskArr([])
    setshowModal(false)
    setshowMessage(true)
    setTimeout(() => {
      setshowMessage(false)
    }, 4000)
  }

  //==========End=====================

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: '28px' }}>
            <span>  {i18n.language === 'en' && 'Welcome to To Do List Site'}
            {i18n.language === 'ar' && 'مرحبا بك في قائمة المهام'}</span>
          </h1>
          <p dir="auto" className="pls">
          {i18n.language === 'en' && 'Please'}
            {i18n.language === 'ar' && 'من فضلك'} &nbsp;
            <Link style={{ fontSize: '30px' }} to="/signin">
            {i18n.language === 'en' && 'sign in'}
            {i18n.language === 'ar' && ' قم بتسجيل الدخول'} &nbsp;
            </Link>
            {i18n.language === 'en' && 'to continue...'}
            {i18n.language === 'ar' && ' اولاً'}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    )
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {' '}
              Welcome: {user.displayName}{' '}
              <span>
                <i className="fa-solid fa-heart"></i>{' '}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain()
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      )
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* OPIONS (filtered data) */}

            {/* SHOW all tasks */}
            <AllTasksSection user={user} />

            {/* Add new task BTN */}
            <section className="mt">
              <button
                dir="auto"
                onClick={() => {
                  setshowModal(true)
                }}
                className="add-task-btn"
              >
                {i18n.language===('en') && 'Add new task '}
                {i18n.language===('ar') && ' إضافة مهمة جديدة ' }
                <i className="fa-solid fa-plus"></i>
              </button>
            </section>
            {showModal && (
              <HomeModal
                closeModal={closeModal}
                submitBTN={submitBTN}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                taskArr={taskArr}
                showLoading={showLoading}
              />
            )}
          <Snackbar showMessage={showMessage}/>
          </main>

          <Footer />
        </>
      )
    }
  }
}

export default Home
