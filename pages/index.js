import Link from "next/link";
function Home() {
  return (
    <>
      <a href="https://www.youtube.com/watch?v=9cIWcoQONfk">VAI CORINTHIANS</a>
      <br />
      <Link href="/api/v1/status">Ver status</Link>
    </>
  );
}

export default Home;
