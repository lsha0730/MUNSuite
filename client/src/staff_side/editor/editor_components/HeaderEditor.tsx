import { useEffect, useContext, ChangeEvent } from "react";
import "./QEditor.scoped.css";
import { staffContext } from "../../../common/Context";
import { FBStorageFolder, FormOperation } from "../../../common/types/types";
import { HeaderQ } from "../../../common/types/questionTypes";
import { ControlProps } from "../QuestionEditorPair";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../common/components/input";
import { firebaseUploadOnChange } from "../../../common/utils/firebase";
import FileUpload from "../../../common/components/input/file_upload/FileUpload";

function HeaderEditor({
  id,
  type,
  heading,
  subheading,
  image,
  editing,
  updateForm,
}: HeaderQ & ControlProps) {
  const {
    staffAPI: { userID },
  } = useContext(staffContext);

  const { register, watch, setValue } = useForm<HeaderQ>({
    defaultValues: {
      heading,
      subheading,
    },
  });

  useEffect(() => {
    watch((data) => {
      const original: HeaderQ = {
        id,
        type,
        heading,
        subheading,
        image,
      };
      updateForm(FormOperation.Update, id, Object.assign(original, data));
    });
  }, []);

  return (
    <div className={editing === id ? "block-container" : "hidden"}>
      <p className="heading">Header</p>

      <FileUpload onChange={handleUpload} file={image} label="Image" />

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

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!userID) return;
    const file = await firebaseUploadOnChange(
      e,
      userID,
      FBStorageFolder.Header
    );
    if (file) setValue("image", file);
  }
}

export default HeaderEditor;
