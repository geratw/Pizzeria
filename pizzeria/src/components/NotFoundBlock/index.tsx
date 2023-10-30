import React from "react";

import styles from "./NotFoundBlock.module.scss";



const NotFoundBlock: React.FC = () => {
  return (
    <>
      <h1 className={styles.root}>
        <span>&#128546;</span>
        <br />
        Ничего не найдено
        <h2 className={styles.description}>К сожалению, данная страница отсутствует в нашем интернет-магазине</h2>
      </h1>
    </>
  );
};

export default NotFoundBlock;
