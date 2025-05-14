import React from "react";
import { Link } from "react-router-dom";

const Page = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Página não encontrada</h1>
      <Link to="/" style={styles.link}>Voltar para a home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F4F4F4',
  },
  heading: {
    color: '#302E2E',
    fontSize: '36px',
    marginBottom: '20px',
  },
  link: {
    color: '#302E2E',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 20px',
    border: '1px solid #302E2E',
    borderRadius: '5px',
    backgroundColor: '#E6E6E6',
  },
};

export default Page;
