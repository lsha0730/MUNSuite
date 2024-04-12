import { useEffect } from "react";
import "./QEditor.scoped.css";
import { Toggle } from "../../../common/components/input";
import { FormOperation } from "../../../common/types/types";
import { LongTextQ, MaxCap as MC } from "../../../common/types/questionTypes";
import { ControlProps } from "../QuestionEditorPair";
import { Controller, useForm } from "react-hook-form";
import { ShortText } from "../../../common/components/input";
import { MaxCap } from "../../../common/utils/utils";

type Inputs = {
  required: boolean;
  heading: string;
  subheading: string;
  maxchars: MC;
};

const MAX_CHAR_LIMIT = 10000;

function LongTextEditor({
  id,
  type,
  heading,
  subheading,
  required,
  maxchars,
  editing,
  updateForm,
}: LongTextQ & ControlProps) {
  const { register, control, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      required,
      heading,
      subheading,
      maxchars,
    },
  });

  useEffect(() => {
    watch((data) => {
      if (data.maxchars && data.maxchars > MAX_CHAR_LIMIT)
        setValue("maxchars", MAX_CHAR_LIMIT);

      const original: LongTextQ = {
        id,
        type,
        heading,
        subheading,
        required,
        maxchars,
      };
      const screened = {
        ...data,
        maxchars: MaxCap(Math.min(data.maxchars || 0, MAX_CHAR_LIMIT)),
      };
      updateForm(FormOperation.Update, id, Object.assign(original, screened));
    });
  }, []);

  return (
    <div className={editing === id ? "block-container" : "hidden"}>
      <p className="heading">Long Text</p>

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
        label="Max Characters"
        placeholder="No Limit"
        bg="gray"
        {...register("maxchars")}
      />
    </div>
  );
}

export default LongTextEditor;
