const usernames = [
    "amendtwice",
    "barrelmode",
    "blackberriespaver",
    "battap",
    "symbolmyself",
    "warnhistoric",
    "zealtrojan",
    "colobuspoint",
    "suddenunpopular",
    "funnytunnel",
    "cheerfullength",
    "dugintend",
    "boyfriendnine",
    "dulecontact",
    "revengepractice",
    "chirpheavenly",
    "pillarspanish",
    "snoozealderman",
    "slenderwinner",
    "plainmom",
    "weargulp",
    "Raumus",
    "sharpactivist",
    "malinambitious",
    "jacketsalsa",
    "differentrunning",
    "maryeconomic",
    "practicalagency",
    "eathugging",
    "optimismcongregation",
    "researcherparcel",
    "sympathyrudolph",
    "detergentdrafty",
    "ownbrood",
    "poofretain",
    "liontaste",
    "backpenitent",
    "skeinsulky",
    "grouchyroband",
    "boardgreedy",
    "creamyanyway",
    "illfatedobtainable",
    "scratchysandstone",
    "drunklook",
    "balanceddevoted",
    "noxiousfrosted",
    "rotatingoutfielder",
    "guaranteesoldier",
    "beltfound",
    "followbusstop",
]

const thoughtsText = [
    'I love coding',
    'Im not suffering at all',
    'MongoDB is getting better',
    'Node.js is POWERFUL', 
    'I love React',
    'I hope im doing this right',
];

const reactionText = ['Absolutely!', 'I agree!', 'Nice thought!', 'Well said!', 'Love it!'];

// Get a random item given an array
export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

// function to generate a random user
export const getRandomUser = () => {
    const username = getRandomArrItem(usernames);
    return {
        username,
        email: `${username.toLowerCase()}@example.com`,
    };
};

// Function to generate a thought linked to a username
export const getRandomThought = (username: string) => ({
    thoughtText: getRandomArrItem(thoughtsText),
    username,
    createdAt: new Date(),
    reactions: getRandomReactions(2), // Add reactions
  });

// Function to generate a set of random reactions
export const getRandomReactions = (numReactions: number) => {
    return Array.from({ length: numReactions }, () => ({
      reactionBody: getRandomArrItem(reactionText),
      username: getRandomArrItem(usernames),
      createdAt: new Date(),
    }));
  };