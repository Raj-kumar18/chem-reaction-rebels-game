
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image?: string;
}

export const questionBank: Question[] = [
  {
    id: 1,
    question: "What is the major product when 2-methylpropene reacts with HBr in the presence of peroxides?",
    options: [
      "1-bromo-2-methylpropane",
      "2-bromo-2-methylpropane", 
      "1-bromo-1-methylethane",
      "2-bromo-1-methylpropane"
    ],
    correctAnswer: "1-bromo-2-methylpropane",
    explanation: "In the presence of peroxides, HBr addition follows anti-Markovnikov's rule due to free radical mechanism. The bromine attaches to the less substituted carbon.",
    topic: "Alkene Reactions",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "Which of the following shows the correct order of +I effect?",
    options: [
      "(CH₃)₃C- > (CH₃)₂CH- > CH₃CH₂- > CH₃-",
      "CH₃- > CH₃CH₂- > (CH₃)₂CH- > (CH₃)₃C-",
      "(CH₃)₂CH- > (CH₃)₃C- > CH₃CH₂- > CH₃-",
      "CH₃CH₂- > CH₃- > (CH₃)₂CH- > (CH₃)₃C-"
    ],
    correctAnswer: "(CH₃)₃C- > (CH₃)₂CH- > CH₃CH₂- > CH₃-",
    explanation: "The +I effect increases with the number of alkyl groups attached to the carbon. More alkyl groups = stronger electron donation.",
    topic: "GOC - Electronic Effects",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What happens when benzene reacts with CH₃COCl in the presence of AlCl₃?",
    options: [
      "Acetophenone is formed",
      "Toluene is formed",
      "Benzyl chloride is formed",
      "No reaction occurs"
    ],
    correctAnswer: "Acetophenone is formed",
    explanation: "This is Friedel-Crafts acylation. CH₃COCl (acetyl chloride) introduces an acetyl group into benzene forming acetophenone (C₆H₅COCH₃).",
    topic: "Aromatic Reactions",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "Which carbocation is most stable?",
    options: [
      "CH₃⁺",
      "CH₃CH₂⁺",
      "(CH₃)₂CH⁺",
      "(CH₃)₃C⁺"
    ],
    correctAnswer: "(CH₃)₃C⁺",
    explanation: "Tertiary carbocations are most stable due to hyperconjugation and +I effect of three alkyl groups. Stability order: 3° > 2° > 1° > methyl.",
    topic: "GOC - Carbocations",
    difficulty: "Easy"
  },
  {
    id: 5,
    question: "What is the major product when 1-butanol is heated with concentrated H₂SO₄ at 140°C?",
    options: [
      "1-butene",
      "2-butene", 
      "Dibutyl ether",
      "Butyl hydrogen sulfate"
    ],
    correctAnswer: "Dibutyl ether",
    explanation: "At 140°C, alcohols undergo intermolecular dehydration to form ethers. Two molecules of 1-butanol lose H₂O to form dibutyl ether.",
    topic: "Alcohol Reactions",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Which of the following is NOT a characteristic of aromatic compounds?",
    options: [
      "Planar structure",
      "4n+2 π electrons (Hückel's rule)",
      "Complete delocalization of π electrons",
      "High reactivity towards addition reactions"
    ],
    correctAnswer: "High reactivity towards addition reactions",
    explanation: "Aromatic compounds are stable and prefer substitution reactions over addition reactions due to the stability of the aromatic ring.",
    topic: "Aromaticity",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "What is the major product when cyclohexene reacts with OsO₄ followed by NaHSO₃?",
    options: [
      "Cyclohexanol",
      "Cyclohexane-1,2-diol",
      "Cyclohexanone",
      "Cyclohexane"
    ],
    correctAnswer: "Cyclohexane-1,2-diol",
    explanation: "OsO₄ followed by NaHSO₃ is a syn-dihydroxylation reaction that adds two OH groups on the same side of the alkene to form a diol.",
    topic: "Alkene Reactions",
    difficulty: "Hard"
  },
  {
    id: 8,
    question: "Which effect is shown by -NO₂ group?",
    options: [
      "Only +I effect",
      "Only -I effect", 
      "Both +I and +R effects",
      "Both -I and -R effects"
    ],
    correctAnswer: "Both -I and -R effects",
    explanation: "The nitro group (-NO₂) shows both -I effect (due to high electronegativity of N and O) and -R effect (due to conjugation with the benzene ring).",
    topic: "GOC - Electronic Effects",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "What is the IUPAC name of CH₃-CH(CH₃)-CH₂-CH(C₂H₅)-CH₃?",
    options: [
      "2-methyl-4-ethylpentane",
      "4-ethyl-2-methylpentane",
      "2-ethyl-4-methylpentane", 
      "4-methyl-2-ethylpentane"
    ],
    correctAnswer: "4-ethyl-2-methylpentane",
    explanation: "Number the longest chain to give substituents the lowest possible numbers. The chain has 5 carbons (pentane) with methyl at C-2 and ethyl at C-4.",
    topic: "IUPAC Nomenclature",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "Which reagent is used for the conversion of alkyl halides to alcohols?",
    options: [
      "Aqueous KOH",
      "Alcoholic KOH",
      "Dry HCl",
      "Conc. H₂SO₄"
    ],
    correctAnswer: "Aqueous KOH",
    explanation: "Aqueous KOH provides OH⁻ ions which perform nucleophilic substitution on alkyl halides to form alcohols. Alcoholic KOH promotes elimination.",
    topic: "Alkyl Halide Reactions",
    difficulty: "Easy"
  },
  {
    id: 11,
    question: "What type of isomerism is shown by CH₃CH₂CHClCH₃?",
    options: [
      "Optical isomerism only",
      "Geometrical isomerism only",
      "Both optical and geometrical",
      "Neither optical nor geometrical"
    ],
    correctAnswer: "Optical isomerism only",
    explanation: "The compound has a chiral carbon (C attached to 4 different groups: H, Cl, CH₃, CH₂CH₃), so it shows optical isomerism. No C=C bond for geometrical isomerism.",
    topic: "Isomerism",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "Which of the following alkenes will show geometrical isomerism?",
    options: [
      "CH₂=CH-CH₃",
      "CH₃-CH=CH-CH₃",
      "CH₂=C(CH₃)₂",
      "(CH₃)₂C=CH₂"
    ],
    correctAnswer: "CH₃-CH=CH-CH₃",
    explanation: "For geometrical isomerism, each carbon of C=C must have two different groups. Only 2-butene (CH₃-CH=CH-CH₃) satisfies this condition.",
    topic: "Isomerism",
    difficulty: "Medium"
  },
  {
    id: 13,
    question: "What is the product when acetylene reacts with 2 moles of HBr?",
    options: [
      "CH₃CHBr₂",
      "CH₂Br-CH₂Br",
      "CHBr₂-CHBr₂",
      "CH₃CH₂Br"
    ],
    correctAnswer: "CH₃CHBr₂",
    explanation: "Acetylene (HC≡CH) adds 2 HBr following Markovnikov's rule. First HBr gives CH₂=CHBr, then second HBr gives CH₃CHBr₂ (1,1-dibromoethane).",
    topic: "Alkyne Reactions",
    difficulty: "Medium"
  },
  {
    id: 14,
    question: "Which compound will undergo SN1 reaction fastest?",
    options: [
      "CH₃Cl",
      "(CH₃)₂CHCl",
      "(CH₃)₃CCl",
      "CH₃CH₂Cl"
    ],
    correctAnswer: "(CH₃)₃CCl",
    explanation: "SN1 reaction rate depends on carbocation stability. Tertiary carbocations are most stable, so (CH₃)₃CCl reacts fastest via SN1 mechanism.",
    topic: "GOC - Reaction Mechanisms",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "What is the hybridization of carbon in methanol (CH₃OH)?",
    options: [
      "sp",
      "sp²",
      "sp³",
      "sp³d"
    ],
    correctAnswer: "sp³",
    explanation: "Carbon in methanol is bonded to 3 hydrogens and 1 oxygen (4 sigma bonds total), so it has sp³ hybridization with tetrahedral geometry.",
    topic: "Hybridization",
    difficulty: "Easy"
  },
  {
    id: 16,
    question: "Which of the following is the strongest acid?",
    options: [
      "CH₃COOH",
      "CHCl₂COOH",
      "CCl₃COOH",
      "CH₂ClCOOH"
    ],
    correctAnswer: "CCl₃COOH",
    explanation: "Trichloroacetic acid (CCl₃COOH) is strongest due to maximum -I effect of three Cl atoms, which stabilizes the conjugate base most effectively.",
    topic: "GOC - Acidity",
    difficulty: "Medium"
  },
  {
    id: 17,
    question: "What is the major product when propene reacts with HBr?",
    options: [
      "1-bromopropane",
      "2-bromopropane",
      "1,2-dibromopropane",
      "1,3-dibromopropane"
    ],
    correctAnswer: "2-bromopropane",
    explanation: "HBr addition to propene follows Markovnikov's rule. H⁺ adds to C-1 (less substituted) and Br⁻ adds to C-2 (more substituted), giving 2-bromopropane.",
    topic: "Alkene Reactions",
    difficulty: "Easy"
  },
  {
    id: 18,
    question: "Which of the following shows maximum resonance stabilization?",
    options: [
      "Benzene",
      "Naphthalene",
      "Anthracene",
      "Phenanthrene"
    ],
    correctAnswer: "Anthracene",
    explanation: "Anthracene has the maximum number of resonance structures among the given options, leading to greater delocalization and stabilization energy.",
    topic: "Aromaticity",
    difficulty: "Hard"
  },
  {
    id: 19,
    question: "What type of reaction is the conversion of alkyl halide to alkene using alcoholic KOH?",
    options: [
      "Substitution",
      "Addition",
      "Elimination",
      "Rearrangement"
    ],
    correctAnswer: "Elimination",
    explanation: "Alcoholic KOH promotes β-elimination (dehydrohalogenation) where HX is eliminated from adjacent carbons to form C=C double bond.",
    topic: "Elimination Reactions",
    difficulty: "Easy"
  },
  {
    id: 20,
    question: "Which compound has the highest boiling point?",
    options: [
      "CH₃CH₂OH",
      "CH₃CH₂CH₃",
      "CH₃OCH₃",
      "CH₃CH₂F"
    ],
    correctAnswer: "CH₃CH₂OH",
    explanation: "Ethanol has the highest boiling point due to hydrogen bonding between OH groups, which requires more energy to break compared to other intermolecular forces.",
    topic: "Physical Properties",
    difficulty: "Easy"
  },
  {
    id: 21,
    question: "What is the major product when benzene reacts with Br₂ in the presence of FeBr₃?",
    options: [
      "Bromobenzene",
      "1,2-dibromobenzene",
      "1,4-dibromobenzene",
      "1,3-dibromobenzene"
    ],
    correctAnswer: "Bromobenzene",
    explanation: "This is electrophilic aromatic substitution (bromination). FeBr₃ activates Br₂ to form Br⁺ electrophile which substitutes one H atom in benzene.",
    topic: "Aromatic Reactions",
    difficulty: "Easy"
  },
  {
    id: 22,
    question: "Which of the following carbanions is most stable?",
    options: [
      "CH₃⁻",
      "CF₃⁻",
      "CH₃CH₂⁻",
      "(CH₃)₃C⁻"
    ],
    correctAnswer: "CF₃⁻",
    explanation: "CF₃⁻ is most stable due to the strong -I effect of three fluorine atoms, which delocalizes the negative charge effectively.",
    topic: "GOC - Carbanions",
    difficulty: "Hard"
  },
  {
    id: 23,
    question: "What is the product when acetaldehyde reacts with hydrogen cyanide?",
    options: [
      "CH₃CH(OH)CN",
      "CH₃CH₂CN",
      "CH₃COOH",
      "CH₃CH(CN)OH"
    ],
    correctAnswer: "CH₃CH(OH)CN",
    explanation: "HCN undergoes nucleophilic addition to the carbonyl group of acetaldehyde. CN⁻ attacks the carbonyl carbon, forming a cyanohydrin.",
    topic: "Carbonyl Reactions",
    difficulty: "Medium"
  },
  {
    id: 24,
    question: "Which effect is responsible for the stability of tertiary carbocations?",
    options: [
      "Inductive effect only",
      "Resonance effect only",
      "Hyperconjugation only",
      "Both inductive effect and hyperconjugation"
    ],
    correctAnswer: "Both inductive effect and hyperconjugation",
    explanation: "Tertiary carbocations are stabilized by both +I effect of alkyl groups and hyperconjugation (σ-π conjugation) from C-H bonds of adjacent alkyl groups.",
    topic: "GOC - Carbocations",
    difficulty: "Medium"
  },
  {
    id: 25,
    question: "What is the correct order of reactivity towards electrophilic substitution?",
    options: [
      "Benzene > Toluene > Chlorobenzene",
      "Toluene > Benzene > Chlorobenzene",
      "Chlorobenzene > Benzene > Toluene",
      "Benzene > Chlorobenzene > Toluene"
    ],
    correctAnswer: "Toluene > Benzene > Chlorobenzene",
    explanation: "CH₃ group in toluene shows +I effect (activating), while Cl in chlorobenzene shows -I effect (deactivating). Activating groups increase reactivity.",
    topic: "Aromatic Reactions",
    difficulty: "Medium"
  }
];
