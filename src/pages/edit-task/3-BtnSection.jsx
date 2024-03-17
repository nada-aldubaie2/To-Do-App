import { collection, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useTranslation } from 'react-i18next'

const BtnSecion = ({ user, strindId, deleteBTN }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid))
  const { i18n } = useTranslation()

  return (
    <section className="center mtt">
      <div>
        <button
          onClick={() => {
            deleteBTN()
          }}
          className="delete"
        >
            {i18n.language===('en') && 'Delete task  '}
                {i18n.language===('ar') && ' حذف المهمة ' }
        </button>
      </div>
    </section>
  )
}

export default BtnSecion
