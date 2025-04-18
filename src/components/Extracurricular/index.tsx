"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ActivityList from "./ActivityList";
import ActivityBox from "./ActivityBox";

const ExtraCurricular = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Extracurricular Activities"
          paragraph="SamSriah School also has some extracurricular activities so that you can join us to learn the following activities even if you are not our students"
          center
          width="665px"
        />

        <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-amber-500"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#FFCE1B] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-amber-500"
              } ml-4 cursor-pointer text-amber-500 font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <ActivityBox
            packageName=""
            price={isMonthly ? "40" : "120"}
            duration={isMonthly ? "mo" : "yr"}
            activityTitle="Music"
            subtitle="Learning music is like unlocking a magical language that speaks to the soul. Every note you play, every chord you master, is a step closer to expressing emotions words can’t capture."
          >
            <ActivityList text="Piano" status="active" />
            <ActivityList text="Drums" status="active" />
            <ActivityList text="Flute" status="active" />
            <ActivityList text="Guitar" status="active" />
            <ActivityList text="Violin" status="inactive" />
            <ActivityList text="Synthetizer" status="inactive" />
          </ActivityBox>
          <ActivityBox
            packageName=""
            price={isMonthly ? "399" : "789"}
            duration={isMonthly ? "mo" : "yr"}
            activityTitle="Web-Developer"
            subtitle="Learning web development is like building your own digital universe—one line of code at a time. Every challenge you solve, every project you create, is a step toward turning ideas into reality."
          >
            <ActivityList text="Html & css" status="active" />
            <ActivityList text="Sass" status="active" />
            <ActivityList text="Javascript" status="active" />
            <ActivityList text="React.js" status="active" />
            <ActivityList text="Next.js" status="active" />
            <ActivityList text="ReactNative(Mobile Application)" status="inactive" />
          </ActivityBox>
          <ActivityBox
            packageName=""
            price={isMonthly ? "589" : "999"}
            duration={isMonthly ? "mo" : "yr"}
            activityTitle="Designer"
            subtitle="Design is more than just aesthetics—it’s storytelling, problem-solving, and creating experiences that resonate. Every color, font, and pixel you choose shapes how the world interacts with ideas."
          >
            <ActivityList text="Creativity & Expression 🎨" status="active" />
            <ActivityList text="Problem-Solving 🔍" status="active" />
            <ActivityList text=" Versatility ✨" status="active" />
            <ActivityList text="Technical + Artistic Balance 💻🖌️" status="active" />
            <ActivityList text="Continuous Learning 📚" status="inactive" />
            <ActivityList text="Impact & Influence 🌍" status="inactive" />
          </ActivityBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            className="fill-amber-500"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            className="fill-amber-500"

          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default ExtraCurricular;
