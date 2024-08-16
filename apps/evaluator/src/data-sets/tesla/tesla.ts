import { DataSet } from '../../types';

const dataSet: DataSet = {
  name: 'Tesla Company',
  instructions:
    // 'Identifica si en el tweet se trata sobre la empresa Tesla.',
    'Identifica si el tweet trata directamente sobre la empresa Tesla, mencionando específicamente a Tesla como una entidad corporativa, sus productos, servicios, o cualquier evento relacionado con la empresa. Excluye menciones a personas asociadas, como Elon Musk, que no estén directamente relacionadas con la compañía en el contexto del tweet.',
  examples: [
    {
      input: `CONFIRMED: July 2024 was Tesla China's best first month of any quarter in its history with 46,227 sales, 13% higher than the previous best first month of a quarter.`,
      expected_output: true,
    },
    {
      input: `$TSLA 🇨🇳
NEWS: Tesla China delivered 46,227 vehicles to the domestic market in July and exported 27,890 vehicles.

The number of vehicles delivered to the domestic market is the highest at the beginning of the quarter. `,
      expected_output: true,
    },
    {
      input: `NEWS: 12,500 Teslas were insured in China last week.`,
      expected_output: true,
    },
    {
      input: `$TSLA 🇨🇳
BREAKING: Tesla China insured units

< Aug 2024>
(29)-4 : 12,500`,
      expected_output: true,
    },
    {
      input: `That @realDonaldTrump has the confidence to chat for 2+ hours with @elonmusk while @KamalaHarris would likely never accept Elon’s invitation, speaks volume about her. Elon would be as courteous toward her, and would offer her an enormous platform, and yet she’ll probably never…`,
      expected_output: false,
    },
    {
      input: `Most popular 𝕏 Spaces ever (ranked by total listeners):

1) Elon Musk & Trump: 17 million (and counting)
2) Elon Musk & Ron DeSantis: 4.4 million
3) Elon Musk & BBC : 3.5 million
4) Robin Wheeler - Elon Musk Q&A: 2.8 million
5) Elon Musk's Twitter Files: 2.4 million

Note: These… `,
      expected_output: false,
    },
    {
      input: `youtu.be/pd8C9qw-Pus?si…
👆👆👆
While attending the @theXtakeover last month, I tested out the new matrix LED headlamps I got during the accident repair that took place couple months ago along with the new adaptive headlights function Tesla has recently enabled. How did they… `,
      expected_output: true,
    },
    {
      input: `Don’t bet against this man named Elon Musk, he’ll turn a dream into a reality and leave anyone that bets against him & his companies in the dust`,
      expected_output: false,
    },
    {
      input: `While BYD sells a lot of cheap models, Model Y and Model 3 comfortably dominate the med-tier NEV segment in China.`,
      expected_output: true,
    },
    {
      input: `The next live stream with Elon Musk & Donald Trump needs to happen in his Tesla Cybertruck driving on FSD brought to the 𝕏 world via Starlink  `,
      expected_output: true,
    },
  ],
};

export default dataSet;
