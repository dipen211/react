import React from "react";
import i18n from "i18next";
import "../../translations/config";
import { Component } from "react";

class LanguageSelector extends Component {
  // const { t, i18n } = useTranslation()

  // changeLanguage = (event) => {
  //   i18n.changeLanguage(event.target.value);
  // };

  languageChangeHandler = (e: { target: { value: string; }; }) => {
    i18n.changeLanguage(e.target.value);
  };
  render() {
    return (
      <div>
        <select onChange={(e) => this.languageChangeHandler(e)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      // <div onChange={(e) => this.changeLanguage(e)}>
      //   <input type="radio" value="en" name="language" /> English
      //   <input type="radio" value="es" name="language" /> Traditional Chinese
      // </div>
    );
  }
}

export default LanguageSelector;
