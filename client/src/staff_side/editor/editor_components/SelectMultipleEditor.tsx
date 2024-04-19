import { useEffect } from "react";
import "./QEditor.scoped.css";
import { Options, ShortText, Toggle } from "../../../common/components/input";
import { FormOperation } from "../../../common/types/types";
import { Controller, useForm } from "react-hook-form";
import {
  DelOptions,
  MaxCap,
  SelectMultipleQ,
} from "../../../common/types/questionTypes";
import { ControlProps } from "../QuestionEditorPair";

type Inputs = {
  required: boolean;
  max: MaxCap;
  heading: string;
  subheading: string;
  options: DelOptions;
};

function SelectMultipleEditor({
  id,
  type,
  heading,
  subheading,
  required,
  max,
  options,
  editing,
  updateForm,
}: SelectMultipleQ & ControlProps) {
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
      const original: SelectMultipleQ = {
        id,
        type,
        heading,
        subheading,
        required,
        max,
        options,
      };
      updateForm(FormOperation.Update, id, Object.assign(original, data));
    });
  }, []);

  return (
    <div className={editing === id ? "block-container" : "hidden"}>
      <p className="heading">Select Multiple</p>
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

      <ShortText
        type="number"
        label="Max Selectable"
        placeholder="No Limit"
        bg="gray"
        {...register("max")}
      />

      <Controller
        name="options"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Options options={value} onChange={onChange} canUseDels />
        )}
      />
    </div>
  );
}

export default SelectMultipleEditor;
