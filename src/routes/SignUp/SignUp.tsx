import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "~/api/requests";
import styles from "~/styles/Signup/SignUp.module.scss";
import Loading from "~/components/common/Loading";

interface SignUpBody {
  email: string 
  password: string 
  displayName: string 
  profileImgBase64?: string 
  pwConfirm?: string
}

const SignUp = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignUpBody>({
    mode: 'onChange'
  });

  const emailValidation = {
    required: "이메일은 필수 입력입니다.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    }
  };

  const nameValidation = {
    required: "이름은 필수 입력입니다.",
    minLength: {
      value: 3,
      message: "이름은 3자이상입니다.",
    }
  };
  const passwordValidation = {
    required: "비밀번호는 필수 입력입니다.",
    pattern: {
      value: /^[A-za-z0-9]*$/ ,
      message: '영문와 숫자만 가능합니다.' ,
  } ,
    minLength: {
      value: 8,
      message: "비밀번호는 8 ~ 16자입니다."
    }
  };


  const onAgreeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsAgree(!isAgree);
    }
  };

  const onSubmitHandler = async ({email, displayName, password}: SignUpBody) => {
    setIsLoading(true);

    if (!isAgree) {
      return alert("이용약관 및 개인정보수집에 동의해 주세요!");
    }
    let body = {
      email,
      displayName,
      password
    };
    try {
      isAgree && await signUp(body) 
      reset();
      if (confirm("회원가입 성공!\n로그인 페이지로 이동하시겠습니까?")) {
        navigate('/sweethome/login')
      } else {
        navigate('/sweethome')
      }
    } catch (error) {
      console.log("SignUp Error", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <section className={styles.container}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.title}>
              <h2>회원가입</h2>
            </div>
              <div className={styles.infoList}>
                <label className={styles.label}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="이메일"
                    {...register("email", emailValidation)}
                  />
                  {errors?.email && (<span>{errors.email.message}</span>)}
                </label>
              </div>
              <div className={styles.infoList}>
                <label className={styles.label}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="이름"
                    maxLength={20}
                    {...register("displayName", nameValidation)}
                  />
                {errors?.displayName && (<span>{errors.displayName.message}</span>)}
                </label>
              </div>
              <div className={styles.infoList}>
                <label className={styles.label}>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호"
                    maxLength={16}
                    {...register("password", passwordValidation)}
                  />
              {errors?.password && (<span>{errors.password.message}</span>)}
                </label>
              </div>
              <div className={styles.infoList}>
                <label className={styles.label}>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호 확인"
                    maxLength={16}
                    {...register("pwConfirm", {
                      required: "비밀번호는 필수 입력입니다.",
                      validate: {
                        value: (val: string | undefined) => {
                          if(watch("password") !== val)
                        return "비밀번호가 일치하지 않습니다." 
                        }
                      },
                    })}
                  />
                {errors?.pwConfirm && (<span>{errors.pwConfirm.message}</span>)}
                </label>
              </div>
              <div className={styles.agree}>
                <label className={styles.checkBox}>
                  <input
                    type="checkbox"
                    onChange={onAgreeHandler}
                    checked={isAgree}
                  />
                  <p>
                    이용약관 및 개인정보수집, 쇼핑정보 수신에 모두 동의합니다.
                  </p>
                </label>
                <div className={styles.agreeContainer}>
                  <div className={styles.agreeText}>
                    <p>1. 개인정보의 수집항목 및 수집 방법</p>
                    <p>
                      통계청 나라통계 사이트에서는 기본적인 회원 서비스 제공을
                      위한 필수정보로 실명인증정보와 가입정보로 구분하여 다음의
                      정보를 수집하고 있습니다. 필수 정보를 입력해주셔야 회원
                      서비스 이용이 가능합니다.
                    </p>
                    <p>가. 수집하는 개인정보의 항목</p>
                    <p>-가입정보: 이메일, 이름, 비밀번호</p>
                  </div>
                </div>
              </div>
              <button
                className={styles.btn}
                disabled={isSubmitting}>
                회원가입
              </button>
            </form>
      </section>
    </>
  );
};

export default SignUp;
