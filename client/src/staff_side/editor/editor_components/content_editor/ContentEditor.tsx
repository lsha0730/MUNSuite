import { useEffect } from "react";
import "../QEditor.scoped.css";
import "./ContentEditor.scoped.css";
import { FormOperation } from "../../../../common/types/types";
import { ContentQ, ContentType } from "../../../../common/types/questionTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { ControlProps } from "../../QuestionEditorPair";
import { Button, TextInput } from "../../../../common/components/input";
import { DEFAULT_CONTENT } from "../../../../common/constants";
import ContentItem from "./ContentItem";
import { firebaseDelete } from "../../../../common/utils/firebase";

function ContentEditor({
  id,
  type,
  heading,
  subheading,
  content,
  editing,
  updateForm,
}: ContentQ & ControlProps) {
  const { register, watch, control, setValue } = useForm<ContentQ>({
    defaultValues: {
      heading,
      subheading,
      content,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content",
  });

  useEffect(() => {
    watch((data) => {
      const original: ContentQ = {
        id,
        type,
        heading,
        subheading,
        content,
      };
      updateForm(FormOperation.Update, id, Object.assign(original, data));
    });
  }, []);

  function addItem(type: ContentType) {
    append(DEFAULT_CONTENT[type]);
  }

  function removeItem(index: number) {
    if (index < 0 || index >= fields.length) return;

    const { type, value } = fields[index];
    if (type === ContentType.Image) {
      firebaseDelete(value.path);
    }

    remove(index);
  }

  return (
    <div className={editing === id ? "block-container" : "hidden"}>
      <p className="heading">Content Block</p>

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

      {fields.map((c, i) => (
        <ContentItem
          type={c.type}
          index={i}
          control={control}
          register={register}
          setValue={setValue}
          onRemove={removeItem}
        />
      ))}

      <div className="add_content">
        <Button
          type="light"
          size="tiny"
          onClick={() => {
            addItem(ContentType.Image);
          }}
        >
          Add Image
        </Button>
        <Button
          type="light"
          size="tiny"
          onClick={() => {
            addItem(ContentType.Text);
          }}
        >
          Add Text
        </Button>
      </div>
    </div>
  );
}

export default ContentEditor;
