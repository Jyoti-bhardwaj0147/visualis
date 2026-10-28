import { Footer } from "@/components/layout/Footer";
import { ProgressSummary } from "@/components/progress/ProgressSummary";
export const metadata = { title: "Your progress" };
export default function Progress() {
  return (
    <>
      <main className="section shell route-page">
        <span className="eyebrow">SMALL HABITS, VISIBLE PROGRESS</span>
        <h1>Your week in focus</h1>
        <p className="page-description">
          Real moments, at your own pace. Your activity is stored only on this
          browser.
        </p>
        <div className="week-label">
          <span>This Week</span>
          <span>MONDAY — SUNDAY</span>
        </div>
        <ProgressSummary full />
      </main>
      <Footer />
    </>
  );
}
