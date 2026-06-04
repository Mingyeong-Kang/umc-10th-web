export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const error = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email,
    )
  ) {
    error.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호 8자 20자 사이
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    error.password = "비밀번호는 8자 ~ 20자 사이로 입력해주세요.";
  }

  return error;
}

//로그인 유효성 검사
function validateSignin (valus: UserSigninInformation) {
    return validateUser(valus);
}

export {validateSignin};
