import {
  arrayRemove,
  arrayUnion,
  collection,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import Moment from 'react-moment'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SubTaskSection = ({ user, strindId, completedCheckbox, trashIcon }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, strindId))

  const [showAddNewTask, setShowAddNewTask] = useState(false)
  const [subtitle, setSubtitle] = useState('')
  const { i18n } = useTranslation()

  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time" dir='auto'>
          {i18n.language===('en') && 'Created'}
                {i18n.language===('ar') && ' انشئ    ' }
             <Moment fromNow date={value.data().id} />
          </p>
          <div>
            <input
              onChange={async (eo) => {
                completedCheckbox(eo)
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            <label dir='auto' htmlFor="checkbox">  {i18n.language===('en') && 'Completed'}
                {i18n.language===('ar') && ' منجز   ' } </label>
          </div>
        </div>

        <ul>
          {value.data().tasks.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p> {item} </p>
                <i
                  onClick={(eo) => {
                    trashIcon(item)
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            )
          })}
        </ul>
        {showAddNewTask && (
          <form style={{flexDirection:'row'}} className="add-new-task flex">
            <input
              onChange={(eo) => {
                setSubtitle(eo.target.value)
              }}
              value={subtitle}
              className="add-task"
              type="text"
            />
          <div>
              <button
                onClick={async (eo) => {
                  eo.preventDefault();
                  setSubtitle("")
                  await updateDoc(doc(db, user.uid, strindId), {
                    tasks: arrayUnion(subtitle),
                  })
                }}
                className="add"
              >
                  {i18n.language===('en') && 'Add  '}
                {i18n.language===('ar') && ' اضافة ' }
              </button>
              <button
                onClick={(eo) => {
                  eo.preventDefault();
                  setShowAddNewTask(false)
                }}
                className="cancel"
              >
                  {i18n.language===('en') && 'cancel  '}
                {i18n.language===('ar') && ' إالغاء ' }
              </button>
          </div>
          </form>
        )}
        <div className="center mtt ">
          <button
            onClick={() => {
              setShowAddNewTask(true)
            }}
            className="add-more-btn"
            dir='auto'
          >
            {i18n.language===('en') && '  Add more '}
                {i18n.language===('ar') && 'اضافة المزيد ' } <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    )
  }
}

export default SubTaskSection
