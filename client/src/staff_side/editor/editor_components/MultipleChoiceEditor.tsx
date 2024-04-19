import { useEffect } from "react";
import "./QEditor.scoped.css";
import { Options, ShortText, Toggle } from "../../../common/components/input";
import { FormOperation, Option } from "../../../common/types/types";
import { MultipleChoiceQ } from "../../../common/types/questionTypes";
import { ControlProps } from "../QuestionEditorPair";
import { Controller, useForm } from "react-hook-form";

type Inputs = {
  required: boolean;
  heading: string;
  subheading: string;
  options: Option[];
};

function MultipleChoiceEditor({
  id,
  type,
  heading,
  subheading,
  required,
  options,
  editing,
  updateForm,
}: MultipleChoiceQ & ControlProps) {
  const { register, control, watch } = useForm<Inputs>({
    defaultValues: {
      required,
      heading,
      subheading,
      options,
    },
  });

  useEffect(() => {
    watch((data) => {
      const original: MultipleChoiceQ = {
        id,
        type,
        heading,
        subheading,
        required,
        options,
      };
      updateForm(FormOperation.Update, id, Object.assign(original, data));
    });
  }, []);

  return (
    <div className={editing === id ? "block-container" : "hidden"}>
      <p className="heading">Multiple Choice</p>
      <Controller
        name="required"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Toggle
            size="small"
            color="red"
            value={value}
            onValue={onChange}
            label={{
              on: "Required",
              off: "Optional",
              direction: "left",
            }}
            style={{
              position: "absolute",
              top: 20,
              right: 35,
              cursor: "pointer",
            }}
          />
        )}
      />

      <ShortText
        label="Heading"
        placeholder="Input here..."
        bg="gray"
        {...register("heading")}
      />

      <ShortText
        label="Subheading"
        placeholder="Input here..."
        bg="gray"
        {...register("subheading")}
      />

      <Controller
        name="options"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Options options={value} onChange={onChange} />
        )}
      />
    </div>
  );
}

export default MultipleChoiceEditor;
