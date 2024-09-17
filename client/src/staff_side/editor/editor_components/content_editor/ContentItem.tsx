import "./ContentEditor.scoped.css";
import "../QEditor.scoped.css";
import { FaTrash } from "react-icons/fa";
import FileUpload from "../../../../common/components/input/file_upload/FileUpload";
import {
  ContentQ,
  ContentType,
  File,
} from "../../../../common/types/questionTypes";
import { Button, TextInput } from "../../../../common/components/input";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { staffContext } from "../../../../common/Context";
import { ChangeEvent, useContext, useEffect } from "react";
import { firebaseUploadOnChange } from "../../../../common/utils/firebase";
import { FBStorageFolder } from "../../../../common/types/types";
import { DEFAULT_CONTENT } from "../../../../common/constants";
import { capitalize } from "../../../../common/utils/utils";

type Props = {
  type: ContentType;
  index: number;
  control: Control<ContentQ, any>;
  register: UseFormRegister<ContentQ>;
  setValue: UseFormSetValue<ContentQ>;
  onRemove: (index: number) => void;
};

const ContentItem = ({
  type,
  index,
  control,
  register,
  setValue,
  onRemove,
}: Props) => {
  const contentComponents: Record<ContentType, JSX.Element> = {
    [ContentType.Image]: (
      <Controller
        name={`content.${index}.value`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FileUpload
            file={value as File}
            onChange={async (e) => {
              const file = await onImageUpload(e);
              onChange(file);
            }}
          />
        )}
      />
    ),
    [ContentType.Text]: (
      <Controller
        name={`content.${index}.value`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            component="textarea"
            fullWidth
            value={value}
            onChange={onChange}
            bg="gray"
            placeholder="Input here..."
          />
        )}
      />
    ),
  };

  const {
    staffAPI: { userID },
  } = useContext(staffContext);

  async function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!userID) return;
    const file = await firebaseUploadOnChange(
      e,
      userID,
      FBStorageFolder.Content
    );
    return file;
  }

  return (
    <div className="item">
      <div>
        <div className="header">
          <p className="subheading">{capitalize(type)}</p>
          <Button
            type="white"
            size="tiny"
            style={{ marginBottom: 4.5 }}
            onClick={() => {
              onRemove(index);
            }}
          >
            <FaTrash size={12} color="#ff5a5a" />
          </Button>
        </div>

        <TextInput
          placeholder="Input here..."
          bg="gray"
          fullWidth
          {...register(`content.${index}.heading`)}
        />
      </div>

      {contentComponents[type]}
    </div>
  );
};

export default ContentItem;
