import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

const useForm = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    email: "",
    password: "",
  });

  // 입력값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    validate(name, value);
  };

  // 유효성 검사
  const validate = (name: string, value: string) => {
    let message = "";

    if (name === "email") {
      if (!value.includes("@") || !value.includes(".")) {
        message = "유효하지 않은 이메일 형식입니다.";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        message = "비밀번호는 최소 6자 이상이어야 합니다.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const isValid =
    values.email &&
    values.password &&
    !errors.email &&
    !errors.password;

  return { values, errors, handleChange, isValid };
};

export default useForm;