import './editTask.css'

import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from 'comp/header'
import Footer from 'comp/Footer'
import { auth } from '../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import Error404 from 'pages/error404'
import Loading from '../../comp/Loading'
import TitleSection from './1-TitleSection'
import SubTaskSection from './2-SubTaskSection'
import BtnSection from './3-BtnSection'
import { useNavigate, useParams } from 'react-router-dom'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ReactLoading from 'react-loading'

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth)
  let { strindId } = useParams()
  console.log(typeof strindId)
const navigate = useNavigate();


  // ======================
  // 1- Title Section
  // ======================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, strindId), {
      // @ts-ignore
      title: eo.target.value,
    })
  }
  // ======================
  // 2- Sub-Task Section
  // ======================
  const completedCheckbox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, strindId), {
        completed: true,
      })
    } else {
      await updateDoc(doc(db, user.uid, strindId), {
        completed: false,
      })
    }
  }
  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, strindId), {
      tasks: arrayRemove(item),
   });
  }
  // ======================
  // 3- BTNs Section
  // ======================
  const [showData, setShowData] = useState(false)

  const deleteBTN = async(eo) => {
    //eo.preventDefault()
    setShowData(true)
    await deleteDoc(doc(db, user.uid, strindId));
    navigate("/", {replace: true}) ;
  }

  if (error) {
    return <Error404 />
  }

  if (loading) {
    return <Loading />
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />
        {showData? (
<main>      <ReactLoading type={'spin'} color={'white'} height={77} width={77} />
</main>
        ):(
        <div className="edit-task">
          {/* Title */}
          <TitleSection
            user={user}
            strindId={strindId}
            titleInput={titleInput}
          />

          {/* Sub-tasks section */}
          <SubTaskSection
            user={user}
            strindId={strindId}
            completedCheckbox={completedCheckbox} trashIcon={trashIcon}/>

          {/* Add-more BTN && Delete BTN */}
          <BtnSection user={user} strindId={strindId} deleteBTN={deleteBTN} />
        </div>)}
        

        <Footer />
      </div>
    )
  }
}

export default EditTask
