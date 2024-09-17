import { useEffect } from "react";
import "./QEditor.scoped.css";
import { TextInput, Toggle } from "../../../common/components/input";
import { FormOperation } from "../../../common/types/types";
import { Options } from "../../../common/components/input";
import { DelOptions, DropdownQ } from "../../../common/types/questionTypes";
import { Controller, useForm } from "react-hook-form";
import { ControlProps } from "../QuestionEditorPair";

type Inputs = {
  required: boolean;
  heading: string;
  subheading: string;
  options: DelOptions;
};

function DropdownEditor({
  id,
  type,
  heading,
  subheading,
  required,
  options,
  editing,
  updateForm,
}: DropdownQ & ControlProps) {
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
      const original: DropdownQ = {
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
    <div className={editing == id ? "block-container" : "hidden"}>
      <p className="heading">Dropdown</p>
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

      <TextInput
        label="Heading"
        placeholder="Input here..."
        bg="gray"
        {...register("heading")}
      />

      <TextInput
        label="Subheading"
        placeholder="Input here..."
        bg="gray"
        {...register("subheading")}
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

export default DropdownEditor;
