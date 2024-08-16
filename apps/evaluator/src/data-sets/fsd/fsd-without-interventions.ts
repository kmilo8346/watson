import { DataSet } from '../../types';

const dataSet: DataSet = {
  name: 'FSD Without Interventions',
  instructions:
    // 'Identifica si en el tweet se menciona que el usario no tuvo que hacer una intervención usando Tesla FSD. El término en ingles es "intervention" o "disengagements". El tweet debe mencionar de forma explícita que no tuvo que hacer intervención en el viaje con Tesla FSD.',
    'Identifica si en el tweet se menciona que el usuario no tuvo que hacer una intervención usando Tesla FSD. El término en inglés es "intervention" o "disengagements". El tweet debe mencionar de forma explícita que no tuvo que hacer intervención en el viaje con Tesla FSD, y debe estar relacionado directamente con la conducción del vehículo, no con una falta de acción general o en otro contexto.',
  examples: [
    {
      input: `FSD 12.5.1.1 was not able to go with 0 disengagements, but the 2 I had were pretty minor. The first was ~45 minutes into the drive. Full video will be posted Monday. 

Overall, crazy impressive, safe, and comfortable.`,
      expected_output: false,
    },
    {
      input: `FSD 12.5.1.1 -> Chicago Construction Traffic
** Zero Interventions / No Hands**

Multiple great moves even though other drivers drive on the shoulder.

1. Great slow down to let others in on a tight highway merge. (As if my car was understanding my hand gestures 😂)

2. Cars… `,
      expected_output: true,
    },
    {
      input: `FSD drove me for an hour and it was one of the most comfortable rides I've had. Apart from a few manual speed changes, there were no disengagements, no interventions, no close calls, no nags... just pure bliss. This is the future, and it's amazing. @tesla @elonmusk @aelluswamy`,
      expected_output: true,
    },
    {
      input: `No action from Tesla required, seems like this one can be put to bed`,
      expected_output: false,
    },
  ],
};

export default dataSet;
