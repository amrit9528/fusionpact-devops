import AnimatedNav from "../components/navigation/AnimatedNav";
import PrivacyContent from "../components/privacy/PrivacyContent";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      <AnimatedNav bgColor="bg-black/70" variant="default" />
      <PrivacyContent />
    </div>
  );
}
