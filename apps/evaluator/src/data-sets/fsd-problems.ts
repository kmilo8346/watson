import { DataSet } from '../types';

const dataSet: DataSet = {
  name: 'FSD Problems',
  instructions:
    'Identifica si en el tweet se menciona algun problema que haya tenido el usuario usando Tesla FSD. El tweet debe mencionar FSD de forma explícita.',
  examples: [
    {
      input: `I compared FSD 12.5.1 to 12.3.6 back-to-back in a challenging intersection w/ an unprotected left turn. The results were very interesting. 

Full video is here: youtu.be/Dk_1B3AaOFk`,
      expected_output: false,
    },
    {
      input: `Here is a highlight clip from my FSD Supervised v12.5.1.1. drive today in Hurricane Debby.  Some interesting and impressive behavior, even while the degraded badge was present the entire time. Check it out!  @Tesla_AI`,
      expected_output: false,
    },
    {
      input: `This was a really solid ride. It picked the wrong lane and took a weird little detour towards the end, and could not park itself at the destination, but no other noticeable issues.`,
      expected_output: true,
    },
    {
      input: `My full length FSD Supervised v12.5.1.1 Unprotected Left Turns video has been posted here on @X for subscribers.  For the public version please head over to YT and look for the thumbnail below.  Check it out! @Tesla_AI`,
      expected_output: false,
    },
    {
      input: `Here is a highlight clip from today's FSD Supervised v12.5.1.1 Unprotected Left Turns video.  Multiple runs, good results, and one new odd behavior.  Check it out! @Tesla_AI`,
      expected_output: false,
    },
    {
      input: `Elon: I think Tesla will have sort of a chatGPT moment, maybe if not this year I’d say no later than next year.

I believe Tesla’s Nvidia/ChatGPT moment is close as FSD 12.5 starts to go wide and Robotaxi Day draws closer.

*This video was recorded last year.

$TSLA`,
      expected_output: false,
    },
    {
      input: `You can also click directly on the car if you want to wake it up without activating anything.

Overall this is a nice improvement, now I need it stop waking every time I walk near it at home.`,
      expected_output: false,
    },
  ],
};

export default dataSet;
