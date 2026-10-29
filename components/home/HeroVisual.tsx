import { Eye } from "lucide-react";
export function HeroVisual() {
  return (
    <div className="hero-visual relative overflow-hidden">
      {/* <div className="visual-label">
        <span className="status-dot" /> YOUR MOMENT OF FOCUS
      </div> */}
      <div className="orbital">
        <div className="orbit-ring outer" />
        <div className="orbit-ring middle" />
        <div className="orbit-ring inner" />
        <div className="eye-core">
          <Eye strokeWidth={1.1} />
        </div>
        <div className="orbit-spinner">
          <span className="orbit-dot" />
        </div>
        <span className="orbit-cross cross-one">+</span>
        <span className="orbit-cross cross-two">+</span>
      </div>
      
    </div>
  );
}
