import { useState, ChangeEvent, FormEvent } from "react";

export interface FormDataType {
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

const useForm = (
  initialValues: FormDataType,
  onSubmit: (formData: FormData) => void
) => {
  const [formData, setFormData] = useState<FormDataType>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (fields: Partial<FormDataType> = formData): boolean => {
    const tempErrors: FormErrors = {};

    if ("name" in fields)
      tempErrors.name = fields.name?.trim()
        ? ""
        : "نام محصول الزامی است";

    if ("price" in fields) {
      const priceValue = Number(fields.price);
      if (!fields.price) tempErrors.price = "قیمت الزامی است";
      else if (isNaN(priceValue) || priceValue < 0)
        tempErrors.price = "قیمت باید عدد مثبت باشد";
      else tempErrors.price = "";
    }

    if ("description" in fields)
      tempErrors.description = fields.description?.trim()
        ? ""
        : "توضیحات الزامی است";

    if ("image" in fields)
      tempErrors.image = fields.image ? "" : "تصویر الزامی است";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((err) => err === "");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      validate({ [name]: value });
      return updated;
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => {
      const updated = { ...prev, image: file };
      validate({ image: file });
      return updated;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("descriptions", formData.description);
      payload.append("category", formData.description);
      if (formData.image) {
        payload.append("image", formData.image);
      }
      onSubmit(payload);
    } else {
      console.log("❌ فرم شامل خطاست:", errors);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useForm;
