import styles from '~/styles/Mypage/MyInfo.module.scss'
import { useForm } from 'react-hook-form'
import { editInfo } from '~/api/requests'
import { useOutletContext } from 'react-router-dom'
import { off } from 'process'


interface RequestBody {
  displayName?: string // 새로운 표시 이름
  profileImgBase64?: string // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
  oldPassword?: string // 기존 비밀번호
  newPassword?: string // 새로운 비밀번호
}


const MyInfo = () => {
  const [userInfo] = useOutletContext();

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

    const ChangePWHandeler = async({oldPassword, newPassword}) => {
      if (oldPassword <= 8 || newPassword <= 8) return alert('비밀번호는 8자이상 입력해주세요.')
      const body = {
        oldPassword,
        newPassword
      }

      try {       
          const res = await editInfo(body)
          if (res.status === undefined) return alert('기존 비밀번호가 틀렸습니다.')
          else {
            console.log('개인정보수정', res)
            alert('비밀번호가 변경되었습니다.')
            reset();
        }

      } catch (error) {
        console.log('개인정보수정 오류', error)
      }
      
    } 


  return (
    <section className={styles.info}>
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2>개인 정보 수정</h2>
        </div>
        <form onSubmit={handleSubmit(ChangePWHandeler)}>
          <div className={styles.infoList}>
            <label
              className={styles.label}
            >
              <p>이메일</p>
              <input
                type="text"
                className={styles.input}
                placeholder={userInfo.email}
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
                placeholder={userInfo.displayName}
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
      </div>
    </div> 
</section>
  )
}

export default MyInfo