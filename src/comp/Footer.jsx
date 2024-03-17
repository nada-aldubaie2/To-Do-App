import React from "react";
import    './Footer.css';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { i18n } = useTranslation();

  if(i18n.language==="ar"){
  return (
<div className="myfooter">
      <footer dir="rtl" className="nada ">
     تم تصميمه وتطويره بواسطة ندى الدُبعي
         
         <span>  <i className="fa-solid fa-heart"></i> </span>
      </footer>
</div>
  );
  }
  if(i18n.language==="en"){
  return (
<div className="myfooter">
      <footer  className="nada">
      Designed and developed Nada Aldubaie
         
         <span>  <i className="fa-solid fa-heart"></i> </span>
      </footer>
</div>
  );
  }
};

export default Footer;
