import { useState, useEffect } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 값 변경
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  // blur 시 touched 처리
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // input props 묶기
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // 값 바뀔 때마다 검증
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [values, validate]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
