import styles from '~/styles/Mypage/MyInfo.module.scss'
import { useForm } from 'react-hook-form'


interface RequestBody {
  displayName?: string // 새로운 표시 이름
  profileImgBase64?: string // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
  oldPassword?: string // 기존 비밀번호
  newPassword?: string // 새로운 비밀번호
}


const MyInfo = () => {

  const { 
    register, 
    handleSubmit,
    watch, 
    formState: { errors, isSubmitting},
    reset 
  } = useForm({ 
      mode: 'onChange',
      // resolver: yupResolver(schema)
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



  return (
    <section className={styles.info}>
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2>개인 정보 수정</h2>
        </div>
        <form>
          <div className={styles.infoList}>
            <label
              className={styles.label}
            >
              <p>이메일</p>
              <input
                type="text"
                className={styles.input}
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
                {...register("newPassword", userPassword)}
              />
              {errors?.newPassword && (<span>{errors.newPassword.message}</span> )}
            </label>
          </div>

          <button
            type='submit'
            className={styles.btn}
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