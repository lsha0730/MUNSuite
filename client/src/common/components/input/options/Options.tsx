import { useContext, useRef } from "react";
import { Button, ShortText } from "../";
import "./Options.scoped.css";
import { AllDelegations, DelOptions } from "../../../types/questionTypes";
import { staffContext } from "../../../Context";
import { FaTrash } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { classNames } from "../../../utils/utils";

type Props = {
  options: DelOptions;
  onChange: (options: DelOptions) => void;
};

const Options = ({ options, onChange }: Props) => {
  const {
    firebaseData: { delegations },
  } = useContext(staffContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsList =
    options === AllDelegations
      ? delegations.map((d) => ({ key: d.id as string, label: d.name }))
      : options;

  function removeOption(key: string) {
    if (options === AllDelegations) return;
    const newList = options.filter((op) => op.key !== key);
    onChange(newList);
  }

  function addOption() {
    if (!inputRef.current) return;
    const input = inputRef.current.value;
    if (input === "") return;

    const option = { key: uuid(), label: input };
    const newList =
      options === AllDelegations
        ? optionsList.concat(option)
        : options.concat(option);
    onChange(newList);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="container">
      <div className="add_new">
        <ShortText
          ref={inputRef}
          bg="gray"
          placeholder="Add new option..."
          flexGrow
          onEnter={addOption}
        />
        <Button type="light" size="tiny" onClick={addOption}>
          Add
        </Button>
        <Button
          type={options === AllDelegations ? "bricked" : "yellow"}
          size="tiny"
          onClick={() => {
            onChange(AllDelegations);
          }}
        >
          Use Dels
        </Button>
      </div>

      {optionsList.length > 0 ? (
        <div
          className={classNames(
            "options_list",
            options === AllDelegations ? "options_list_bricked" : ""
          )}
        >
          {optionsList.map((op) => (
            <div className="option" onClick={() => removeOption(op.key)}>
              <span className="label">{op.label}</span>
              <FaTrash className="icon" />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">No options</div>
      )}
    </div>
  );
};

export default Options;
