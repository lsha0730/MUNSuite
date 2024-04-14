import { useEffect, useContext, ChangeEvent } from "react";
import "./QEditor.scoped.css";
import { staffContext } from "../../../common/Context";
import { FormOperation } from "../../../common/types/types";
import { HeaderQ } from "../../../common/types/questionTypes";
import { ControlProps } from "../QuestionEditorPair";
import { useForm } from "react-hook-form";
import { ShortText } from "../../../common/components/input";
import { v4 as uuid } from "uuid";
import { firebaseUpload } from "../../../common/utils/firebase";
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
        image
      };
      updateForm(FormOperation.Update, id, Object.assign(original, data));
    });
  }, []);

  return (
    <div className={editing === id ? "block-container" : "hidden"}>
      <p className="heading">Header</p>

      <FileUpload onChange={handleUpload} file={image} label="Image"/>

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
    </div>
  );

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const fileID = uuid();
    const location =
      image.path ||
      `appdata/${userID}/livedata/header/${fileID}.${file.type.slice(6)}`;
    
    const url = await firebaseUpload(file, location)
    setValue("image", {
      name: file.name,
      link: url,
      path: location
    })
  }
}

export default HeaderEditor;
