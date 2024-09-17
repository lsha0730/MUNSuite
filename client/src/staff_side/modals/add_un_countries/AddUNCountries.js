import { useContext, useEffect, useState } from "react";
import "../Modals.scoped.css";
import "./AddUNCountries.scoped.css";
import UNCountriesData from "../../../common/assets/json/un_country_list.json";
import { classNames } from "../../../common/utils/utils";
import { staffContext } from "../../../common/Context";

function AddUNCountries(props) {
  const {
    firebaseData: { delegations },
  } = useContext(staffContext);
  const [modalSelections, setModalSelections] = useState([]);
  const [delNames] = useState(
    delegations.map((delegateObj) => {
      return delegateObj.name;
    })
  );
  const [countriesNotInList] = useState(
    UNCountriesData.filter((country) => {
      return !delNames.includes(country);
    })
  );

  const [countriesNotInListRenders, setCountriesNotInListRenders] = useState(
    []
  );

  useEffect(() => {
    function handleClick(country) {
      if (!modalSelections.includes(country)) {
        setModalSelections(modalSelections.concat(country));
      } else {
        setModalSelections(
          modalSelections.filter((item) => {
            return item !== country;
          })
        );
      }
    }

    let renders = countriesNotInList.map((country) => {
      return (
        <div
          className={classNames(
            "delbar",
            modalSelections.includes(country) ? "selected" : ""
          )}
          onClick={() => {
            handleClick(country);
          }}
        >
          <p className="country-name">{country}</p>
        </div>
      );
    });
    setCountriesNotInListRenders(renders);
  }, [modalSelections]);

  return (
    <div className="modal-background">
      <div className="container">
        <div className="modal-top">
          <p className="modal-header">Add UN Countries</p>
          <p className="modal-subheader">
            Select countries, then click "Add Countries" to add them.
          </p>
        </div>

        <div className="modal-body">
          <div className="countries">{countriesNotInListRenders}</div>
        </div>

        <div className="modal-bottom">
          <div
            className="btt-add-countries"
            onClick={() => {
              props.setModal(false);
              props.addDelegates(modalSelections);
              setModalSelections([]);
            }}
          >
            <p>Add Countries</p>
          </div>
          <div
            className="btt-cancel"
            onClick={() => {
              props.setModal(false);
            }}
          >
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUNCountries;
