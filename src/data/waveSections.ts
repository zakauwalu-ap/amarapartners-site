// Narrative panels revealed during the sticky hero scroll (Amara-themed copy).

export interface WaveSectionDetail {
  label: string;
  value: string;
}

export interface WaveSectionContent {
  id: string;
  tag: string;
  title: string;
  titleLineBreak?: string;
  body: string;
  details: WaveSectionDetail[];
}

export const waveSectionPanels: readonly WaveSectionContent[] = [
  {
    id: "depth",
    tag: "Foundation",
    title: "Depth that",
    titleLineBreak: "anchors every mandate",
    body:
      "Rooted in the UAE’s legal and commercial landscape, we bring institutional judgment to transactions, disputes, and regulatory questions that shape your outcomes.",
    details: [
      { label: "Focus", value: "UAE & cross-border" },
      { label: "Discipline", value: "Corporate & disputes" },
      { label: "Phase", value: "Discovery & strategy" },
      { label: "Presence", value: "Abu Dhabi · Reem Island" },
    ],
  },
  {
    id: "threshold",
    tag: "Jurisdictions",
    title: "Between mainland,",
    titleLineBreak: "ADGM, and DIFC",
    body:
      "Whether you operate onshore or in the financial free zones, we align structure, documentation, and risk so your position stays clear across regimes.",
    details: [
      { label: "Mainland UAE", value: "Federal & local" },
      { label: "ADGM", value: "Common law forum" },
      { label: "DIFC", value: "English law hub" },
      { label: "Cross-border", value: "Coordinated counsel" },
    ],
  },
  {
    id: "clarity",
    tag: "Regulatory",
    title: "Clarity in a",
    titleLineBreak: "moving framework",
    body:
      "From compliance programmes to sector-specific regulation, we help you anticipate change—so obligations become operational, not overwhelming.",
    details: [
      { label: "Compliance", value: "Programmes & audits" },
      { label: "Data", value: "PDPL & governance" },
      { label: "Sectors", value: "Healthcare, TMT, more" },
      { label: "Delivery", value: "Practical playbooks" },
    ],
  },
  {
    id: "partnership",
    tag: "Partnership",
    title: "Counsel that",
    titleLineBreak: "stays with you",
    body:
      "We invest in long-term relationships: precise advice, responsive teams, and a steady hand when the stakes are highest.",
    details: [
      { label: "Mandates", value: "Transactions & disputes" },
      { label: "Style", value: "Direct & collaborative" },
      { label: "Outcome", value: "Decisions you can defend" },
      { label: "Next step", value: "Conversation on your terms" },
    ],
  },
];
