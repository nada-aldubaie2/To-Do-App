import { Link } from 'react-router-dom'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ReactLoading from 'react-loading'
import Moment from 'react-moment'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Error404 from 'pages/error404'

export default function AllTasksSection({ user }) {
  const allTasks = query(collection(db, user.uid), orderBy('id'))
  const completedTasks = query(
    collection(db, user.uid),
    where('completed', '==', true),
  )
  const notCompletedTasks = query(
    collection(db, user.uid),
    where('completed', '==', false),
  )
  const [orderTask, setOrderTask] = useState(allTasks)

  const [isFullOpacity, setIsFullOpacity] = useState(false)

  const [selectValue, setSelectValue] = useState('All')

  const [value, loading, error] = useCollection(orderTask)

  const { i18n } = useTranslation()

  if (loading) {
    ;<div className="mttt">
      <ReactLoading type={'spin'} color={'white'} height={77} width={77} />
    </div>
  }

  if (error) {
    return <Error404 />
  }

  if (value) {
    return (
      <div>
        {/* OPIONS (filtered data) */}
        <section className="parent-of-btns flex mtt">
          <button
            style={{ opacity: isFullOpacity ? '1' : '0.3' }}
            onClick={() => {
              setIsFullOpacity(true)
              setOrderTask(
                query(collection(db, user.uid), orderBy('id', 'desc')),
              )
            }}
          >
            {i18n.language === 'en' && 'Newest first'}
            {i18n.language === 'ar' && 'الأحدث أولاً'}
          </button>

          <button
            style={{ opacity: isFullOpacity ? '0.3' : '1' }}
            onClick={() => {
              setIsFullOpacity(false)
              setOrderTask(
                query(collection(db, user.uid), orderBy('id', 'asc')),
              )
            }}
          >
            {i18n.language === 'en' && 'Oldest first'}
            {i18n.language === 'ar' && 'الأقدم أولاً'}
          </button>
          <select
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === 'All') {
                setIsFullOpacity(false)
                setSelectValue('All')
                setOrderTask(allTasks)
              } else if (eo.target.value === 'Completed') {
                setSelectValue('Completed')
                setOrderTask(completedTasks)
              } else if (eo.target.value === 'NotCompleted') {
                setSelectValue('NotComplete')
                setOrderTask(notCompletedTasks)
              }
            }}
            id="browsers"
          >
            <option value="All">
              {' '}
              {i18n.language === 'ar' && 'جميع المهام'}
              {i18n.language === 'en' && 'All Tasks '}
            </option>
            <option value="Completed">
              {' '}
              {i18n.language === 'ar' && 'المهام المكتملة'}
              {i18n.language === 'en' && 'Completed Tasks'}{' '}
            </option>
            <option value="NotCompleted">
              {' '}
              {i18n.language === 'en' && 'Not Completed Tasks'}
              {i18n.language === 'ar' && 'المهام غير المكتملة'}{' '}
            </option>
          </select>
        </section>

        <section className="flex all-tasks mt ">
          {value.docs.length === 0 && (
            <h1>Great! you have done all your tasks ▼_▼</h1>
          )}
          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().tasks.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}>{item}</li>
                      } else {
                        return false
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            )
          })}
        </section>
      </div>
    )
  }
}
