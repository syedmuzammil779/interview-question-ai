"use client";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import ButtonUI from "./button";
import { Check } from "lucide-react";
import LabelUI from "./label";

const CATEGORIES = [
  "Technical Architecture",
  "Behavioral & Leadership",
  "Culture & Core Values",
  "System Design",
];
const SENIORITY = ["Junior", "Mid-Level", "Senior", "Lead"];

interface LoginFormProps {
  isLoading: boolean;
  onGenerate: (data: {
    jobTitle: string;
    seniority: string;
    category: string;
  }) => void;
}

const LoginForm = ({ isLoading = false, onGenerate }: LoginFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      seniority: "Senior",
      category: "Technical Architecture",
    },
  });

  return (
    <form
      className="mt-6 flex flex-col  gap-6"
      onSubmit={handleSubmit(onGenerate)}
    >
      <div>
        <LabelUI id="job_title" title="Job Title" />

        <input
          type="text"
          id="job_title"
          {...register("jobTitle", {
            required: "Job title is required",
            minLength: {
              value: 2,
              message: "Job title must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Job title must not exceed 50 characters",
            },
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: "Job title can only contain letters and spaces",
            },
          })}
          className={`w-full px-4 py-3 bg-white border outline-none text-sm placeholder:text-gray-400 transition-colors ${
            errors.jobTitle
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
          placeholder="Job Title"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <LabelUI id="seniority_level" title="Seniority Level" />

        <Controller
          name="seniority"
          control={control}
          rules={{ required: "Seniority level is required" }}
          render={({ field }) => (
            <Select
              inputId="seniority_level"
              instanceId="seniority_level"
              {...field}
              value={
                SENIORITY.find((s) => s === field.value)
                  ? { value: field.value, label: field.value }
                  : null
              }
              onChange={(opt) => field.onChange(opt?.value)}
              options={SENIORITY.map((s) => ({ value: s, label: s }))}
              isSearchable={false}
              classNamePrefix="rs"
              unstyled
              classNames={{
                control: ({ isFocused }) =>
                  `w-full px-2 py-3 bg-white border cursor-pointer text-sm ${
                    isFocused ? "border-blue-500" : "border-gray-300"
                  }`,
                valueContainer: () => "px-2",
                indicatorsContainer: () => "pr-2 text-gray-500",
                menu: () =>
                  "mt-1 bg-white border border-gray-300 overflow-hidden shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 text-sm cursor-pointer ${
                    isSelected
                      ? "bg-blue-100 text-blue-700"
                      : isFocused
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900"
                  }`,
                singleValue: () => "text-gray-900",
              }}
            />
          )}
        />
        {errors.seniority && (
          <p className="text-red-500 text-xs mt-1">
            {errors.seniority.message}
          </p>
        )}
      </div>

      <div>
        <LabelUI id="question_category" title="Question category" />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => field.onChange(cat)}
                  className={`px-4 py-2 text-sm font-normal transition-colors flex items-center cursor-pointer gap-2 ${
                    field.value === cat
                      ? "bg-blue-500 text-white border border-blue-600"
                      : "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                  {field.value === cat && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <ButtonUI
          title={isLoading ? "Generating..." : "Generate Dataset"}
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default LoginForm;
