import { useLeadModal } from "../context/LeadModalContext";

export default function StickyInterestedButton() {
  const { open } = useLeadModal();

  return (
    <button className="sticky-interested interested-shimmer" onClick={open}>
    Interested?
    </button>

  );
}

