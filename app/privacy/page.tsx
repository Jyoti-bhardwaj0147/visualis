import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
export const metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="shell prose-page">
        <span className="eyebrow">YOUR ROUTINE IS YOURS</span>
        <h1>
          Simple by design.
          <br />
          Private by default.
        </h1>
        <p className="lead">
          Visualis V1 has no accounts, database, advertising trackers, or cloud
          progress sync.
        </p>
        <h2>What is saved</h2>
        <p>
          Completed exercises and eye breaks are saved in your browser’s
          localStorage. Each record contains a random session ID, the exercise
          type, its duration, and its completion time. Incomplete sessions are
          not saved.
        </p>
        <h2>You are in control</h2>
        <p>
          You can delete your activity from the Progress page. Clearing browser
          site data also removes your history. Private browsing, browser
          settings, or limited storage may prevent saving. Progress does not
          transfer between devices or browsers.
        </p>
        <h2>Running the website</h2>
        <p>
          Your browser requests the website from its hosting provider. That
          provider may process normal connection information, such as IP
          addresses and access logs. Visualis does not send your exercise
          history to a server.
        </p>
      </main>
      <Footer />
    </>
  );
}
