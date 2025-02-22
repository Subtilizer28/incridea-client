import { ASSETS } from "~/constants/assets";

type TeamMember = {
  role: string;
  instagram: string;
  github: string;
  linkedin: string;
  image: string;
  quote: string;
};

const TEAM_MEMBERS: {
  [key: string]: TeamMember;
} = {
  "Satwik Prabhu": {
    role: "Team Head",
    instagram: "https://www.instagram.com/satwikprabhu",
    github: "https://github.com/satwikrprabhu",
    linkedin: "https://www.linkedin.com/in/satwikprabhu",
    image: ASSETS.TEAM.SATWIK_PRABHU,
    quote: "I know where you live.",
  },
  "Keerthan K": {
    role: "3D | Explore Page",
    instagram: "https://www.instagram.com/keetha_k11",
    github: "https://github.com/keetha1011",
    linkedin: "https://www.linkedin.com/in/kkeerthan/",
    image: ASSETS.TEAM.KEERTHAN_K,
    quote: "passion && :) >>>",
  },
  "Aryan Singh": {
    role: "3D | Pronite",
    instagram: "https://www.instagram.com/just_aryansingh",
    github: "https://github.com/Wizhill05",
    linkedin: "https://www.linkedin.com/in/justaryansingh",
    image: ASSETS.TEAM.ARYAN_SINGH,
    quote: "but Attendance <<<",
  },
  "A Omkar G Prabhu": {
    role: "Co-Head",
    instagram: "-",
    github: "https://github.com/Prabhuomkar9",
    linkedin: "https://www.linkedin.com/in/prabhuomkar9/",
    image: ASSETS.TEAM.OMKAR,
    quote: "Control yourself, Not others! Tbh atp idc",
  },
  "Samarth H Shetty": {
    role: "Full Stack",
    instagram: "https://www.instagram.com/sammonster1920/",
    github: "https://github.com/Sammonster495",
    linkedin: "https://www.linkedin.com/in/samarth-shetty-a53018247/",
    image: ASSETS.TEAM.SAMARTH,
    quote: "Coding and dancing my way through life",
  },
  "Pratham A Kadekar": {
    role: "Full Stack",
    instagram: "https://www.instagram.com/pratham_ak2004",
    github: "https://github.com/pratham-ak2004",
    linkedin: "https://www.linkedin.com/in/pratham-a-kadekar-8397a7249",
    image: ASSETS.TEAM.PRATHAM_A_KADEKAR,
    quote: "Kon'nichiwa",
  },
  "Karthik Salian": {
    role: "Frontend",
    github: "https://github.com/Karthik-S-Salian",
    instagram: "https://www.instagram.com/karthik_s_.salian/",
    linkedin: "https://www.linkedin.com/in/karthik-salian-3a7a26246/",
    image: ASSETS.TEAM.KARTHIK_SALIAN,
    quote: "Once take a deep breath and say NO",
  },
  "Nandan R Pai": {
    role: "Full Stack",
    instagram: "https://www.instagram.com/nandanpi__/",
    github: "https://github.com/nandanpi",
    linkedin: "https://www.linkedin.com/in/nandanpai09",
    image: ASSETS.TEAM.NANDAN,
    quote: "My touch is the solution to all problems 🥰",
  },
  "Rahul N Bangera": {
    role: "Full Stack",
    instagram: "https://www.instagram.com/rahul_n_bangera",
    github: "https://github.com/Bnir",
    linkedin: "https://www.linkedin.com/in/rahul-n-bangera",
    image: ASSETS.TEAM.RAHUL,
    quote: "Give 200% or Give nothing",
  },
  "Shishir Karkera": {
    role: "Media Co-Head | Capture Incridea Head",
    instagram: "https://www.instagram.com/shishir.karkeraa",
    github: "https://github.com/shishirkarkeraa",
    linkedin: "https://www.linkedin.com/in/shishir-girish-karkera-a61542262/",
    image: ASSETS.TEAM.SHISHIR,
    quote: "Never gonna let you down!",
  },
  "Athul D Bhandary": {
    role: "Full Stack",
    instagram: "https://www.instagram.com/athul_bhandary",
    github: "https://github.com/athul28",
    linkedin: "https://www.linkedin.com/in/athul-d-bhandary-0b1912247/",
    image: ASSETS.TEAM.ATHUL_D_BHANDARY,
    quote: "Hey wassup!!!",
  },
  "Varshith Pawar H R": {
    role: "Frontend | Capture Incridea",
    instagram: "https://www.instagram.com/mr.pawar_10/",
    github: "https://github.com/VarshithPawarHR",
    linkedin: "https://www.linkedin.com/in/varshithpawarhr",
    image: ASSETS.TEAM.VARSHITH,
    quote:
      "No bugs here—just your system struggling to keep up with our brilliance",
  },
  "Snehal Shetty": {
    role: "Full Stack",
    instagram: "https://www.instagram.com/shettysnehal__05",
    github: "https://github.com/shettysnehal",
    linkedin: "https://www.linkedin.com/in/snehalshetty105",
    image: ASSETS.TEAM.SNEHAL_SHETTY,
    quote: "Life so cooked that my luck is on airplane mode",
  },
  "Karthik P K": {
    role: "Backend",
    instagram: "https://www.instagram.com/_karthik_p_k/",
    github: "https://github.com/karthikpk-o",
    linkedin: "https://linkedin.com/in/karthik-p-k",
    image: ASSETS.TEAM.KARTHIK_P_K,
    quote: "The trouble is, you think you have time.",
  },
  "Ashton Prince Mathias": {
    role: "Frontend",
    instagram: "https://www.instagram.com/_ashtonmathias_/",
    github: "https://github.com/Subtilizer28",
    linkedin: "https://www.linkedin.com/in/ashtonmths/",
    image: ASSETS.TEAM.ASHTON_MATHIAS,
    quote: '"your fone linging 📞"',
  },
  "Ishan Shetty": {
    role: "Full Stack | Merch Incridea",
    github: "https://github.com/Ishan-Shetty",
    linkedin: "https://www.linkedin.com/in/ishan-shetty-0a889821a/",
    instagram: "https://www.instagram.com/ishanshetty_",
    image: ASSETS.TEAM.ISHAN,
    quote: "I'm just a chill guy 👾",
  },
  "Gaurav Dhanraja": {
    role: "Frontend | Merch Incridea",
    instagram: "https://instagram.com/gaurav.dhanraja",
    github: "https://github.com/gauravdhanraja",
    linkedin: "https://linkedin.com/in/gauravdhanraja",
    image: ASSETS.TEAM.GAURAV_DHANRAJA,
    quote: "Ishan's a stalker",
  },
  "Riyaz Ahmed": {
    role: "Frontend",
    instagram: "https://www.instagram.com/ria_yz24",
    github: "https://github.com/RiaAug24",
    linkedin: "https://www.linkedin.com/in/riyaz-ahmed24",
    image: ASSETS.TEAM.RIYAZ_AHMED,
    quote: "Try to be the fitting piece, for a missing piece. 🧩",
  },
  "Len Mendonca": {
    role: "Frontend",
    instagram: "https://www.instagram.com/lendanieo/",
    github: "https://github.com/len-mendonca",
    linkedin: "https://in.linkedin.com/in/len-mendonca",
    image: ASSETS.TEAM.LEN_MENDONCA,
    quote: "Maria Pitache",
  },
  "Sathwik Nayak": {
    role: "Frontend | Capture Incridea",
    instagram: "https://www.instagram.com/sathwik_hh",
    github: "https://github.com/002sathwik",
    linkedin: "https://www.linkedin.com/in/sathwik-h-085758246",
    image: ASSETS.TEAM.SATWIK_H,
    quote: "Being part of a team is the greatest contribution I've made.",
  },
  "Chaithra S Nayak": {
    role: "Backend",
    instagram: "https://www.instagram.com/chaithrasnayak3/",
    github: "https://github.com/Chaithra-S-Nayak",
    linkedin: "https://www.linkedin.com/in/chaithra-s-nayak/",
    image: ASSETS.TEAM.CHAITRA,
    quote: "git commit, git push, git regret",
  },
  "M Sayeem Ahmed": {
    role: "Backend",
    instagram: "https://www.instagram.com/ahmedmsayeem/",
    github: "https://github.com/ahmedmsayeem",
    linkedin: "https://www.linkedin.com/in/m-sayeem-ahmed-651a7b254",
    image: ASSETS.TEAM.SAYEEM_AHMED,
    quote: "womp womp",
  },
  "Sourav Bangera": {
    role: "Digital | Explore Videos",
    instagram: "https://www.instagram.com/grungygrid?igsh=OGQ5ZDc2ODk2ZA==",
    github: "",
    linkedin: "https://www.linkedin.com/in/souravbangera",
    image: ASSETS.TEAM.SOURAV_BANGERA,
    quote: "i wish to be touched by Nandan"
  },
};

export { TEAM_MEMBERS };
