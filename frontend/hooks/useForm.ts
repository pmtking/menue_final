import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  price: string;
  description: string;
  image: File | null;
}

interface FormErrors {
  name?: string;
  price?: string;
  description?: string;
  image?: string;
}

const useForm = (initialValues: FormData, onSubmit: (data: FormData) => void) => {
  const [formData, setFormData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (fieldValues: Partial<FormData> = formData) => {
    const temp: FormErrors = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "نام محصول الزامی است";

    if ("price" in fieldValues) {
      if (!fieldValues.price) temp.price = "قیمت محصول الزامی است";
      else if (isNaN(Number(fieldValues.price)) || Number(fieldValues.price) < 0)
        temp.price = "قیمت باید عدد مثبت باشد";
      else temp.price = "";
    }

    if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : "توضیحات الزامی است";

    // تصویر اختیاری است؛ اگر بخوای می‌تونی اعتبارسنجی بزاری
    // if ("image" in fieldValues)
    //   temp.image = fieldValues.image ? "" : "تصویر الزامی است";

    setErrors(temp);

    // اگه همه ارورها خالی بودند، یعنی فرم صحیحه
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newForm = { ...prev, [name]: value };
      validate({ [name]: value });
      return newForm;
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => {
      const newForm = { ...prev, image: file };
      validate({ image: file });
      return newForm;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    } else {
      console.log("فرم شامل خطا است:", errors);
    }
  };

  return { formData, errors, handleChange, handleFileChange, handleSubmit };
};

export default useForm;
