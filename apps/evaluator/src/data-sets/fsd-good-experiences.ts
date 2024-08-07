import { DataSet } from '../types';

const dataSet: DataSet = {
  name: 'FSD Good Experiences',
  instructions:
    'Identifica si en el tweet se menciona si el usuario tuvo una buena experiencia usando Tesla FSD. No debe haber ocurrido NINGUN problema con Tesla FSD. El tweet debe mencionar una buena experiencia con FSD de forma explícita.',
  examples: [
    {
      input: `This is getting crazy good. FSD v12.5.1.1: SOOO GOOD! Flowless 42-Minute Airport Drive
youtu.be/PzTIx0l0TNA

@WholeMarsBlog @DirtyTesLa @AIDRIVR`,
      expected_output: true,
    },
    {
      input: `FSD waits patiently for jaywalker to cross the street.`,
      expected_output: false,
    },
    {
      input: `so FSD 12.5.1.1 is 100% paying attention to hand-held signs now

look at that reaction time!`,
      expected_output: false,
    },
    {
      input: `FSD 12.5.1.1 drives over an hour! But still 2 disengagements needed near the end.

One for road debris, the other because it was going to put us on the highway since it was in the wrong lane.`,
      expected_output: false,
    },
    {
      input: `I was driving w/ FSD 12.4.3 yesterday and it continually executed maneuvers that significantly impressed me. 

But then it would make the wrong moves that would wipe out all of the previous amazing moves. 

I swear, it’s always the 1% that if it’s not completely perfect, it ruins…`,
      expected_output: false,
    },
    {
      input: `FSD drove me for an hour and it was one of the most comfortable rides I've had. Apart from a few manual speed changes, there were no disengagements, no interventions, no close calls, no nags... just pure bliss. This is the future, and it's amazing. @tesla @elonmusk @aelluswamy`,
      expected_output: true,
    },
    {
      input: `My full length FSD Supervised 12.5.1.1 drive in Hurricane Debby has been posted here on @X for subscribers.  For the public version please head over to YT and look for the thumbnail below.  Enjoy! @Tesla_AI`,
      expected_output: false,
    },
  ],
};

export default dataSet;
