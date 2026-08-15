import styles from "./error.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.message}>
        La página que buscás no existe o fue movida.
      </p>
      <div className={styles.actions}>
        <a href="/" className={styles.btnPrimary}>
          Volver al catálogo
        </a>
      </div>
    </div>
  );
}
