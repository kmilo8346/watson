import { DataSet } from '../types';

const dataSet: DataSet = {
  name: 'FSD Interventions',
  instructions:
    'Identifica si en el tweet se menciona que el usario tuvo que hacer una intervención usando Tesla FSD. El término en ingles es "intervention" o "disengagements". El tweet debe mencionar de forma explícita de una intervención con Tesla FSD.',
  examples: [
    {
      input: `FSD 12.5.1.1 was not able to go with 0 disengagements, but the 2 I had were pretty minor. The first was ~45 minutes into the drive. Full video will be posted Monday. 

Overall, crazy impressive, safe, and comfortable.`,
      expected_output: true,
    },
    {
      input: `In this FSD 12.5.1 ride:
- It would not move after engaging AP, accelerator pressed to get it going.
- It attempted a right on red, forcing me to disengage.
- It waited patiently for several jaywalkers.`,
      expected_output: true,
    },
    {
      input: `I'm 99% sure it will move. If a takeover is required it's pretty important for steering to be maintained until the driver is in full control.`,
      expected_output: false,
    },
    {
      input: `This was a really solid ride. It picked the wrong lane and took a weird little detour towards the end, and could not park itself at the destination, but no other noticeable issues.`,
      expected_output: false,
    },
  ],
};

export default dataSet;
