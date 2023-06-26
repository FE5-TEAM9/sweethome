import styles from '~/styles/Mypage/MyInfo.module.scss'
import { useForm } from 'react-hook-form'
import { editInfo } from '~/api/requests'
import { useSelector } from 'react-redux'

interface RequestBody {
  displayName?: string
  profileImgBase64?: string
  oldPassword?: string
  newPassword?: string
}

const MyInfo = () => {
  const user = useSelector(state => state.user)
  console.log(user)

  const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitting},
    reset 
  } = useForm({ 
      mode: 'onChange',
    });

    const userPassword = {
      minLength: {
        value: 8,
        message: "비밀번호는 최소 8자입니다."
      },
      maxLength: {
        value: 16,
        message: "비밀번호는 최대 16자입니다."
      }
    }

    const ChangePWHandeler = async({ oldPassword, newPassword }) => {
      if (oldPassword <= 8 || newPassword <= 8) return alert('비밀번호는 8자이상 입력해주세요.')
      const body = {
        oldPassword,
        newPassword
      }
      try {       
          const res = await editInfo(body)
          if (res) {
            console.log('개인정보수정', res)
            alert('비밀번호가 변경되었습니다.')
            reset();
          } else {
            alert('비밀번호를 다시 입력해 주세요.')
            reset();
          }
      } catch (error) {
        console.log('개인정보수정 오류', error)
      }
    } 

  return (
    <section className={styles.info}>
      <form onSubmit={handleSubmit(ChangePWHandeler)}>
        <div className={styles.title}>
          <h2>개인 정보 수정</h2>
        </div>
          <div className={styles.infoList}>
          <label
            className={styles.label}
          >
            <p>이메일</p>
            <input
              type="text"
              className={styles.input}
              placeholder={user.email}
              autoComplete='off'
              disabled
            />
          </label>
        </div>
        <div className={styles.infoList}>
          <label
            className={styles.label}
          >
            <p>이름</p>
            <input
              type="text"
              className={styles.input}
              placeholder={user.displayName}
              autoComplete="off"
              disabled
            />
          </label>
        </div>
        <div className={styles.infoList}>
          <label
            className={styles.label}
          >
          <p>기존 비밀번호</p>
            <input
              type="password"
              className={styles.input}
              maxLength={16}
              autoComplete="current-password"
              {...register("oldPassword",userPassword)}
            />
            {errors?.oldPassword && (<span>{errors.oldPassword.message}</span> )}
          </label>
        </div>
        <div className={styles.infoList}>
          <label
            className={styles.label}
          >
            <p>변경 비밀번호</p>
            <input
              type="password"
              className={styles.input}
              maxLength={16}
              autoComplete="new-password"
              {...register("newPassword", userPassword)}
            />
            {errors?.newPassword && (<span>{errors.newPassword.message}</span> )}
          </label>
        </div>
        <button
          type='submit'
          className={styles.btn}
          disabled={isSubmitting}
          >
          변경
        </button>
      </form>
    </section>
  )
}

export default MyInfo