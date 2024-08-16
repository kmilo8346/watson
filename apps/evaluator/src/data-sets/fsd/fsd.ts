import { DataSet } from '../../types';

const dataSet: DataSet = {
  name: 'FSD Bad Experiences',
  instructions:
    // 'Identifica si en el tweet se trata directamente sobre la tecnología Tesla FSD.',
    // 'Identifica si en el tweet se menciona o discute explícitamente la tecnología Tesla FSD (Full Self-Driving).',
    'Identifica si el tweet menciona o discute específicamente la tecnología Tesla FSD (Full Self-Driving) como el tema principal. Excluye menciones generales a Tesla u otros productos que no estén relacionados directamente con el FSD.',
  examples: [
    {
      input: `I compared FSD 12.5.1 to 12.3.6 back-to-back in a challenging intersection w/ an unprotected left turn. The results were very interesting. 

Full video is here: youtu.be/Dk_1B3AaOFk`,
      expected_output: true,
    },
    {
      input: `Here is a highlight clip from my FSD Supervised v12.5.1.1. drive today in Hurricane Debby.  Some interesting and impressive behavior, even while the degraded badge was present the entire time. Check it out!  @Tesla_AI`,
      expected_output: true,
    },
    {
      input: `This was a really solid ride. It picked the wrong lane and took a weird little detour towards the end, and could not park itself at the destination, but no other noticeable issues.`,
      expected_output: true,
    },
    {
      input: `My full length FSD Supervised v12.5.1.1 Unprotected Left Turns video has been posted here on @X for subscribers.  For the public version please head over to YT and look for the thumbnail below.  Check it out! @Tesla_AI`,
      expected_output: true,
    },
    {
      input: `Here is a highlight clip from today's FSD Supervised v12.5.1.1 Unprotected Left Turns video.  Multiple runs, good results, and one new odd behavior.  Check it out! @Tesla_AI`,
      expected_output: true,
    },
    {
      input: `Elon: I think Tesla will have sort of a chatGPT moment, maybe if not this year I’d say no later than next year.

I believe Tesla’s Nvidia/ChatGPT moment is close as FSD 12.5 starts to go wide and Robotaxi Day draws closer.

*This video was recorded last year.

$TSLA`,
      expected_output: true,
    },
    {
      input: `You can also click directly on the car if you want to wake it up without activating anything.

Overall this is a nice improvement, now I need it stop waking every time I walk near it at home.`,
      expected_output: false,
    },
    {
      input: `This is getting crazy good. FSD v12.5.1.1: SOOO GOOD! Flowless 42-Minute Airport Drive
youtu.be/PzTIx0l0TNA

@WholeMarsBlog @DirtyTesLa @AIDRIVR`,
      expected_output: true,
    },
    {
      input: `FSD waits patiently for jaywalker to cross the street.`,
      expected_output: true,
    },
    {
      input: `so FSD 12.5.1.1 is 100% paying attention to hand-held signs now

look at that reaction time!`,
      expected_output: true,
    },
    {
      input: `FSD 12.5.1.1 drives over an hour! But still 2 disengagements needed near the end.

One for road debris, the other because it was going to put us on the highway since it was in the wrong lane.`,
      expected_output: true,
    },
    {
      input: `I was driving w/ FSD 12.4.3 yesterday and it continually executed maneuvers that significantly impressed me. 

But then it would make the wrong moves that would wipe out all of the previous amazing moves. 

I swear, it’s always the 1% that if it’s not completely perfect, it ruins…`,
      expected_output: true,
    },
    {
      input: `FSD drove me for an hour and it was one of the most comfortable rides I've had. Apart from a few manual speed changes, there were no disengagements, no interventions, no close calls, no nags... just pure bliss. This is the future, and it's amazing. @tesla @elonmusk @aelluswamy`,
      expected_output: true,
    },
    {
      input: `My full length FSD Supervised 12.5.1.1 drive in Hurricane Debby has been posted here on @X for subscribers.  For the public version please head over to YT and look for the thumbnail below.  Enjoy! @Tesla_AI`,
      expected_output: true,
    },
    {
      input: `$TSLA 🇰🇷
NEWS: Hyundai Motor Group's Namyang Research Institute began dismantling and analyzing Tesla's electric pickup truck, "Cybertruck," at the end of last month.
n.news.naver.com/article/015/00…`,
      expected_output: false,
    },
    {
      input: `My Mom recently moved into a retirement community, where a local fire official just visited to discuss safety with all the residents. He asked if anybody owned any Teslas, and two people raised their hands, including my Mom (2022 Model Y).

He then pronounced “Teslas are catching…`,
      expected_output: false,
    },
    {
      input: `Glad E’s taking time to talk about climate and Tesla.`,
      expected_output: false,
    },
    {
      input: `The update is still rolling out, the latest was earlier today. If your vehicle briefly showed it and it has disappeared, it should retry within 72 hours.

x.com/DriveTeslaca/s…`,
      expected_output: false,
    },
  ],
};

export default dataSet;
