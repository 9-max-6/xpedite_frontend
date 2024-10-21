import Link from 'next/link';

/**
 *
 * @returns when page not found
 */
export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" style={styles.link}></Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1rem',
    color: '#0070f3',
    textDecoration: 'underline',
  },
};
