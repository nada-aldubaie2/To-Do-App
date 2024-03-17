import { collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import ReactLoading from 'react-loading'
import Error404 from 'pages/error404'
import { useRef } from 'react'

const TitleSection = ({ user, strindId, titleInput }) => {
const [value, loading, error] = useDocument(doc(db, user.uid, strindId))

const inputElement = useRef(null)



  if (loading) {
    <main>
      <ReactLoading type={'spin'} color={'white'} height={77} width={77} />
    </main>
  }
  if (error) {
    <main>
      <Error404 type={'spin'} color={'white'} height={77} width={77} />
    </main>
  }

  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
          style={{textDecoration: value.data().completed? "line-through solid #454545" : null}}
          ref={inputElement}
            onChange={async (eo) => {
              titleInput(eo)
            }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
          />
          <i onClick={() => {
            inputElement.current.focus()
          }} className="fa-regular fa-pen-to-square"></i>
        </h1>
      </section>
    )
  }
}

export default TitleSection
