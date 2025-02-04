import { connectDB } from "./config/db";
import Question from "./models/questionModel.js";
const bulkQuestions = [
  {
    question:
      "Would you rather always play aggressively, rushing in to get high kill potential, but risk dying early in the round, or play defensively, keeping safe with low kill opportunities but offering strategic support to your team?",
    option1:
      "Always rush in aggressively, risking early deaths for high kill potential",
    option2:
      "Play defensively, stay safe with lower kill opportunities, but support your team strategically",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather be the last player alive every round, but always be low on credits and forced to buy suboptimal weapons, or have a full team alive every round, but you’re the first to die and unable to contribute much?",
    option1: "Be the last alive with low economy, forced to buy bad weapons",
    option2:
      "Have a full team but be the first to die, unable to contribute much",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather peek corners like a pro, taking risks and potentially getting flashed or shot, but with the ability to outsmart the enemy team, or play it safe every time, avoiding risk but never catching the enemy off-guard?",
    option1:
      "Peek corners like a pro, risking being flashed or shot, but have the chance to outsmart enemies",
    option2:
      "Play it safe every time, avoiding risks but never catching enemies off-guard",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather be forced to use the AWP but have a 50% chance of missing every shot, putting you in risky situations, or play without the AWP, but always have perfect aim with rifles, making you a reliable long-range and mid-range threat?",
    option1:
      "Use the AWP with 50% miss chance, risking poor accuracy but high power",
    option2:
      "Play without the AWP but always have perfect aim with rifles, being a reliable mid to long-range threat",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather be an expert at using smokes to block sightlines and control vision, but have no entry fragging ability, or be a perfect entry fragger with amazing timing, but have no ability to control vision or block sightlines?",
    option1: "Be a smoke expert, controlling vision but unable to entry frag",
    option2:
      "Be a perfect entry fragger with great timing but have no vision control abilities",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather frag out, getting high kill counts each round, but never be able to plant the spike or assist in objectives, or plant the spike every round, playing a crucial role, but only managing to get 2 kills per game?",
    option1:
      "Frag out with high kill counts but never plant the spike or contribute to objectives",
    option2:
      "Always plant the spike but get very low kills, playing an important objective role",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather play with a full kit of abilities every round, including flashes, smokes, and walls, but consistently miss all your shots, or have no abilities at all but always hit your shots with perfect accuracy?",
    option1:
      "Have full abilities but miss all shots, allowing you to support the team without fragging",
    option2:
      "Have no abilities but always hit your shots, becoming a deadly fragger but unable to support the team with utility",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather hold an angle for a full minute, patiently waiting for the enemy to come, and get one kill when they peek, or rush in with your team, getting a 3-kill spray down but dying to the fourth enemy?",
    option1:
      "Hold an angle for a long time and get one kill after patiently waiting",
    option2:
      "Rush in with your team and get a 3-kill spray down but die to the fourth enemy",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather play as **Reyna**, relying solely on your self-heals and ultimate to sustain yourself, but having no smokes or team utility, or play as **Sage**, with no healing abilities but providing extra walls for strategic defense?",
    option1: "Play Reyna, relying on self-heals with no smokes or team support",
    option2:
      "Play Sage, with no healing abilities but provide walls for defense",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather be stuck with low health (like 10 HP) every round but have double your usual movement speed, allowing you to outmaneuver enemies, or always have full health, but walk slower than usual, making it harder to avoid danger?",
    option1: "Low health but double speed, enabling more evasive maneuvers",
    option2:
      "Full health but slower movement, making you an easier target to hit",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather always know where the enemy is hiding and plan your strategy around their locations, but have no weapons to defend yourself, or always have the perfect weapon but never know where the enemy is, making every fight a gamble?",
    option1: "Know the enemy’s location but have no weapons to defend yourself",
    option2: "Have the perfect weapon but never know the enemy's location",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather play 10 rounds in a row with perfect aim, being able to land every shot, but your team loses every round due to lack of teamwork, or play 10 rounds with shaky aim, but win 9 out of the 10 rounds because of great team coordination?",
    option1: "Perfect aim but lose every round due to poor teamwork",
    option2: "Shaky aim but win most rounds due to strong teamwork",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather always get caught in the open, risking easy kills for the enemy, but be able to use your ultimate at perfect moments to turn the tide of the game, or always hide behind cover, never getting the chance to use your ultimate or make impactful plays?",
    option1:
      "Be caught in the open but use your ultimate at the perfect moment",
    option2: "Hide behind cover and never get to use your ultimate",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather be a master at no-scoping and getting kills from unexpected angles, but never get any assists or help your team strategically, or only play supportive roles, like planting and giving intel, but never frag or get kills?",
    option1: "No-scope kills but no team support or assists",
    option2: "Be a team player with support roles but no frags or kills",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather be the first to engage every round, always going in for the fight, but only have a pistol, or always follow your team’s lead, using the best guns but risk being caught in the crossfire?",
    option1: "Engage first with a pistol, being the vanguard of the team",
    option2: "Follow your team with the best guns, risking getting caught",
    votes: { option1: 0, option2: 0 },
    category: "gameplay",
  },
  {
    question:
      "Would you rather have the **most expensive skin** for your favorite weapon, but always play against players with better aim, or have **basic skins** but always play against players of equal skill?",
    option1: "Have the most expensive skin but face players with better aim",
    option2: "Have basic skins but face players of equal skill",
    votes: { option1: 0, option2: 0 },
    category: "skins",
  },
  {
    question:
      "Would you rather always play with **limited edition skins**, but the **weapon stats** are random each game, or always play with **standard skins** but your weapon stats are consistently high?",
    option1: "Play with limited edition skins but random weapon stats",
    option2: "Play with standard skins but always have high weapon stats",
    votes: { option1: 0, option2: 0 },
    category: "skins",
  },
  {
    question:
      "Would you rather **never be able to buy skins** but always have the **best weapon skin** for free in every match, or be able to buy any skin you want but have **random weapon skins** every game?",
    option1: "Never buy skins but always get the best weapon skin for free",
    option2: "Buy any skins but always have random weapon skins",
    votes: { option1: 0, option2: 0 },
    category: "skins",
  },
  {
    question:
      "Would you rather be stuck with **one agent** for the rest of your career, mastering all their abilities, or be able to switch agents every round but never fully understand any one agent's potential?",
    option1: "Master one agent and their abilities forever",
    option2: "Switch agents every round but never master any of them",
    votes: { option1: 0, option2: 0 },
    category: "agents",
  },
  {
    question:
      "Would you rather **never play your main agent** again, but get the chance to play **everyone else’s favorite agent**, or only ever play as **your main agent**, even if it makes your team less balanced?",
    option1:
      "Never play your main agent but play everyone else’s favorite agent",
    option2: "Only play your main agent even at the cost of team balance",
    votes: { option1: 0, option2: 0 },
    category: "agents",
  },
  {
    question:
      "Would you rather always have **perfect synergy with a single teammate** who plays the same agent as you, or have **random teammates** who are unpredictable but skilled at different agents?",
    option1: "Perfect synergy with one teammate who plays the same agent",
    option2: "Random skilled teammates who are unpredictable with agents",
    votes: { option1: 0, option2: 0 },
    category: "agents",
  },
  {
    question:
      "Would you rather be able to **play any agent** at a high level, but always play with random teammates, or only be able to play **one agent**, but always have coordinated teammates?",
    option1: "Play any agent but with random teammates",
    option2: "Play one agent but with coordinated teammates",
    votes: { option1: 0, option2: 0 },
    category: "agents",
  },
  {
    question:
      "Would you rather always play with **friends who have bad aim**, but can strategize well, or play with **friends who are excellent shooters**, but can't communicate or strategize effectively?",
    option1: "Play with friends who have bad aim but can strategize well",
    option2:
      "Play with friends who are excellent shooters but can't strategize",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather play with **friends who play for fun** and often throw rounds, or with **serious friends** who play to win but often get upset after losing?",
    option1: "Play with friends who throw rounds for fun",
    option2: "Play with serious friends who get upset after losing",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather always **carry your friends to victory**, but never get any credit for your performance, or **lose every match** because your friends can’t carry their weight, even though you’re putting in your best effort?",
    option1: "Carry your friends to victory but never get credit",
    option2: "Lose every match because your friends don’t carry their weight",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather **play with friends who are unpredictable**, meaning the matches are fun but chaotic, or **play with friends who are highly coordinated**, meaning the matches are less exciting but more likely to win?",
    option1: "Play with unpredictable friends, making matches fun but chaotic",
    option2:
      "Play with highly coordinated friends, making matches less exciting but more likely to win",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather always be the **shotcaller in your friend group**, but constantly have to deal with blame when things go wrong, or be a **silent player**, but never have a say in the strategy and blame when things go wrong?",
    option1: "Be the shotcaller but deal with blame when things go wrong",
    option2: "Be a silent player and take the blame without a say in strategy",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather play **ranked with friends who are all lower rank than you**, or play **ranked with friends who are all higher rank**, but you never get to carry the team?",
    option1:
      "Play ranked with friends who are lower rank but you carry the team",
    option2:
      "Play ranked with friends who are higher rank but never carry the team",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather have **team wipes** every match with your friends, but have fun with your squad, or **win every match** with random teammates, but feel less connected and have less fun?",
    option1: "Have team wipes but have fun with friends",
    option2: "Win every match with random teammates but feel less connected",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
  {
    question:
      "Would you rather always **queue with friends** and risk **never climbing ranks**, or **queue solo** and risk playing with random players, but have the chance to rank up faster?",
    option1: "Queue with friends and risk not ranking up",
    option2:
      "Queue solo and risk playing with random teammates but climb ranks faster",
    votes: { option1: 0, option2: 0 },
    category: "gameplay with friends",
  },
];
async function addBulkQuestions() {
  try {
    // Connect to the database
    await connectDB();

    // Insert bulk questions
    const result = await Question.insertMany(bulkQuestions);
    console.log(`${result.length} questions added successfully.`);
  } catch (err) {
    console.error("Error adding bulk questions:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

addBulkQuestions();
