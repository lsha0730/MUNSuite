import React, { useState } from "react";
import "./DirectiveCard.scoped.css";
import {
  BsPeopleFill,
  BsEyeglasses,
  BsCheckLg,
  BsXLg,
  BsPersonFill,
} from "react-icons/bs";
import { IoIosFastforward } from "react-icons/io";
import { BiUndo } from "react-icons/bi";
import { MdOutlinePresentToAll } from "react-icons/md";
import Popout from "./Popout";
import { highlight } from "../../../utils";

function DirectiveCard(props) {
  const {
    variant,
    body,
    id,
    updateCards,
    page,
    signatories,
    index,
    title,
    type,
    sponsors,
    author,
    revertDirective,
    search,
  } = props;

  const [presenting, setPresenting] = useState(false);
  const h = (text) => (search ? highlight(text, search) : text);

  function passDirective() {
    updateCards("pass", id);
  }

  function tableDirective() {
    updateCards("table", id);
  }

  function failDirective() {
    updateCards("fail", id);
  }

  function presentDirective() {
    setPresenting(!presenting);
  }

  return (
    <div
      className="card-container"
      style={{ marginRight: page == "history" ? 0 : 20 }}
    >
      {presenting && (
        <Popout
          variant={variant}
          body={body}
          id={id}
          signatories={signatories}
          title={title}
          type={type}
          sponsors={sponsors}
          author={author}
        />
      )}

      {page == "inbox" && (
        <div className="card-operations">
          <div className="btt-present" onClick={presentDirective}>
            <MdOutlinePresentToAll size={23} />
          </div>

          <div className="btts-right">
            <div className="btt-pass" onClick={passDirective}>
              <BsCheckLg size={20} />
            </div>
            <div className="btt-fail" onClick={failDirective}>
              <BsXLg size={20} />
            </div>
            <div className="btt-table" onClick={tableDirective}>
              <IoIosFastforward size={25} />
            </div>
          </div>
        </div>
      )}

      {page == "history" && (
        <div className="btts-right">
          <div
            className="btt-revert"
            onClick={() => {
              revertDirective(index);
            }}
          >
            <p className="btt-revert-text">Revert to Inbox</p>
            <BiUndo size={20} />
          </div>
        </div>
      )}

      {variant == "custom" && (
        <div className="custom-top">
          <BsPersonFill size={30} className="custom-icon" />
          <p className="author">{h(author)}</p>
          <p className="custom-id-tag">ID: {h(id)}</p>
        </div>
      )}

      {variant == "standard" && (
        <div
          className="standard-top"
          style={{ backgroundColor: type == "Public" ? "#3C8CC9" : "#285e86" }}
        >
          <div className="card-top-top">
            <p className="title">{h(title)}</p>
          </div>

          <div className="card-top-bottom">
            <p className="type">{h(type)}</p>
            <p className="id-tag">ID: {h(id)}</p>
          </div>
        </div>
      )}

      {variant == "standard" && (
        <div className="card-tie">
          <div className="tie-set">
            <BsPeopleFill size={15} className="tie-icon" />
            <p>{h(sponsors.join(", "))}</p>
          </div>
          {signatories && signatories.length > 0 ? (
            <div className="tie-set">
              <BsEyeglasses size={18} className="tie-icon" />
              <p className="signatories-list">{h(signatories.join(", "))}</p>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}

      <div className="card-body">
        {body.map((block) => {
          switch (block.type) {
            case "select-multiple":
              return (
                <div>
                  <p className="block-heading">{h(block.heading)}</p>
                  <p className="block-text">
                    {h(block.value ? block.value.join(", ") : "None")}
                  </p>
                </div>
              );
            case "multiplechoice":
              return (
                <div>
                  <p className="block-heading">{h(block.heading)}</p>
                  <p className="block-text">
                    {h(block.value ? block.value.join(", ") : "None")}
                  </p>
                </div>
              );
            default:
              return (
                <div>
                  <p className="block-heading">{h(block.heading)}</p>
                  <p className="block-text">{h(block.value)}</p>
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}

export default DirectiveCard;
