import { DataSet } from '../types';

const dataSet: DataSet = {
  name: 'FSD With Interventions',
  instructions:
    'Identifica si en el tweet se menciona que el conductor tuvo que desconectar o intervenir el sistema de Tesla FSD de manera explícita. Los términos clave a buscar son "disengagement", "disengage", "intervene" o "intervention", pero solo si están directamente asociados con una acción del conductor. No identifiques tweets que solo mencionen estos términos en un contexto general o como parte de una cita o comentario sobre los términos.',
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
    {
      input: `I'm seeing some comments that the data below is misleading because what if someone disengages autopilot right before a crash? Well, Tesla accounts for that.

Tesla: "We count any crash in which Autopilot was deactivated within 5 seconds before impact."`,
      expected_output: false,
    },
    {
      input: `For some reason previous versions of FSD really struggled with this section of road. I had to keep nudging the accelerator to get it to move in the past. 

Not anymore. 

FSD 12.5.1.3 drives through with no hesitations just like a human would do.`,
      expected_output: false,
    },
  ],
};

export default dataSet;
