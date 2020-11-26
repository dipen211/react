import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../translations/config';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (event: any) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="zh-hk" name="language"/> Traditional Chinese
    </div>
  )
}

export default LanguageSelector