import Link from "next/link";
export default function NotFound() {
  return (
    <main className="completion">
      <span className="eyebrow">LET’S FIND YOUR WAY BACK</span>
      <h1>Page not found</h1>
      <p>This path isn’t part of the routine.</p>
      <Link href="/" className="button primary mt-5">
        Back to Home
      </Link>
    </main>
  );
}
