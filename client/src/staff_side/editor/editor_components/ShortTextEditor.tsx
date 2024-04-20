import { useEffect } from "react";
import "./QEditor.scoped.css";
import { Toggle } from "../../../common/components/input";
import { FormOperation } from "../../../common/types/types";
import { Controller, useForm } from "react-hook-form";
import { ShortTextQ } from "../../../common/types/questionTypes";
import { ControlProps } from "../QuestionEditorPair";
import { TextInput } from "../../../common/components/input";

type Inputs = {
  required: boolean;
  heading: string;
  subheading: string;
};

function ShortTextEditor({
  id,
  type,
  heading,
  subheading,
  required,
  editing,
  updateForm,
}: ShortTextQ & ControlProps) {
  const { register, control, watch } = useForm<Inputs>({
    defaultValues: {
      required,
      heading,
      subheading,
    },
  });

  useEffect(() => {
    watch((data) => {
      const original: ShortTextQ = { id, type, heading, subheading, required };
      updateForm(FormOperation.Update, id, Object.assign(original, data));
    });
  }, []);

  return (
    <div className={editing == id ? "block-container" : "hidden"}>
      <p className="heading">Short Text</p>

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
    </div>
  );
}

export default ShortTextEditor;
