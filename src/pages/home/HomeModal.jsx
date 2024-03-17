import Modal from 'shared/Modal'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

const HomeModal = ({
  closeModal,
  submitBTN,
  titleInput,
  detailsInput,
  addBTN,
  taskTitle,
  subTask,
  taskArr,
  showLoading,
}) => {
  const { i18n } = useTranslation()

  return (
    <Modal closeModal={closeModal}>
      <div className="modal-format">
        <input
          required
          placeholder={
              i18n.language === 'en'
                ? 'Add title: '
                : i18n.language === 'ar' && ': اضافة عنوان '
            }
          type="text"
          value={taskTitle}
          onChange={(eo) => {
            titleInput(eo)
          }}
        />
        <div>
          <input
            placeholder={
              i18n.language === 'en'
                ? 'Details: '
                : i18n.language === 'ar' && ': المهمة '
            }
            type="text"
            value={subTask}
            onChange={(eo) => {
              detailsInput(eo)
            }}
          />
          <button
            onClick={(eo) => {
              addBTN(eo)
            }}
          >
              {i18n.language === 'en' && 'Add'}
            {i18n.language === 'ar' && ' إضافة'}
          </button>
        </div>
        <ul>
          {taskArr.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
        <button
          onClick={async (eo) => {
            submitBTN(eo)
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={'spin'}
              color={'white'}
              height={20}
              width={20}
            />
          ) : (
            i18n.language === 'en' ? 
              'Sumbit '
            : 
              i18n.language === 'ar' && '  رفع  '
          )}
        </button>
      </div>
    </Modal>
  )
}

export default HomeModal
