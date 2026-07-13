const countdownElement = document.getElementById("countdown");
const scoreElement = document.getElementById("score");
const cpsElement = document.getElementById("cps");
const rebirthInfo = document.getElementById("rebirthInfo");
const cookieButton = document.getElementById("cookieButton");
const rebirthButton = document.getElementById("rebirthButton");
const upgradesList = document.getElementById("upgradesList");
const resetButton = document.getElementById("resetButton");
const confirmOverlay = document.getElementById("confirmOverlay");
const cancelResetButton = document.getElementById("cancelResetButton");
const confirmResetButton = document.getElementById("confirmResetButton");
const birthdayOverlay = document.getElementById("birthdayOverlay");
const closeBirthdayButton = document.getElementById("closeBirthdayButton");
const confettiLayer = document.getElementById("confettiLayer");
const adOverlay = document.getElementById("adOverlay");
const adMessage = document.getElementById("adMessage");
const adPromptActions = document.getElementById("adPromptActions");
const adPlayerWrap = document.getElementById("adPlayerWrap");
const adVideo = document.getElementById("adVideo");
const adYesButton = document.getElementById("adYesButton");
const adNoButton = document.getElementById("adNoButton");
const adCloseButton = document.getElementById("adCloseButton");
const adsToggle = document.getElementById("adsToggle");
const wordleBoard = document.getElementById("wordleBoard");
const wordleKeyboard = document.getElementById("wordleKeyboard");
const wordleForm = document.getElementById("wordleForm");
const wordleInput = document.getElementById("wordleInput");
const wordleGuessButton = document.getElementById("wordleGuessButton");
const wordleMessage = document.getElementById("wordleMessage");
const newWordleButton = document.getElementById("newWordleButton");
const wordleWinsValue = document.getElementById("wordleWinsValue");
const wordleStreakValue = document.getElementById("wordleStreakValue");
const wordleBoostValue = document.getElementById("wordleBoostValue");
const coinBetInput = document.getElementById("coinBetInput");
const coinGuessHeads = document.getElementById("coinGuessHeads");
const coinGuessTails = document.getElementById("coinGuessTails");
const coinFlipButton = document.getElementById("coinFlipButton");
const coinVisual = document.getElementById("coinVisual");
const coinVisualText = document.getElementById("coinVisualText");
const coinFace = document.getElementById("coinFace");
const coinResult = document.getElementById("coinResult");
const showUpgradesTab = document.getElementById("showUpgradesTab");
const showAchievementsTab = document.getElementById("showAchievementsTab");
const upgradesPanel = document.getElementById("upgradesPanel");
const achievementsPanel = document.getElementById("achievementsPanel");
const achievementsSummary = document.getElementById("achievementsSummary");
const achievementsProgressFill = document.getElementById("achievementsProgressFill");
const achievementsProgressText = document.getElementById("achievementsProgressText");
const achievementsList = document.getElementById("achievementsList");
const SAVE_KEY = "birthday_cookie_clicker_save_v1";
const PERMANENT_ACHIEVEMENTS_KEY = "birthday_cookie_clicker_permanent_achievements_v1";
const SETTINGS_KEY = "birthday_cookie_clicker_settings_v1";
const resetCrashoutAudio = new Audio("Sounds/Average Crashout - Roblox Animation Short_320k.mp3");
const REBIRTH_BASE_COST = 1_000_000_000;
const POWER_MULTIPLIER_PER_LEVEL = 1.5;
const AD_PRODUCTION_MULTIPLIER = 2;
const AD_BOOST_DURATION_MS = 2_000;
const AD_AUTOCLICK_DURATION_MS = 30_000;
const AD_AUTOCLICK_INTERVAL_MS = 100;
const AD_PROMPT_CHECK_MS = 45_000;
const AD_PROMPT_COOLDOWN_MS = 90_000;
const AD_MEDIA_SOURCES = [
  {
    video: "Sounds/Fortnite2Sequal.mp4",
    audio: "Sounds/Fortnite2 Speedrun (again) - Normal - 0_53_470_320k.mp3",
  },
  {
    video: "Sounds/Fortnite2.mp4",
    audio: "Sounds/Fortnite2 Speedrun - Normal - 1_15.360_320k.mp3",
  },
];

const targetDate = new Date("2026-09-06T00:00:00");

let score = 0;
let pointsPerSecond = 0;
let rebirthCount = 0;
let rebirthCost = REBIRTH_BASE_COST;
let birthdayCelebrationShown = false;
let totalCrashoutsEarned = 0;
let totalCookieClicks = 0;
let wordleGamesPlayed = 0;
let wordleWins = 0;
let wordleLosses = 0;
let wordleCurrentStreak = 0;
let wordleBestStreak = 0;
let wordleBestGuessCount = null;
const unlockedAchievements = new Set();
const permanentAchievements = new Set();
let adBoostActiveUntil = 0;
let adPromptCooldownUntil = 0;
let adBoostTimeoutId = null;
let adAutoClickerActiveUntil = 0;
let adAutoClickerTimeoutId = null;
let adAutoClickerIntervalId = null;
let adsEnabled = true;
const adAudio = new Audio();
let currentAdMedia = null;
let selectedCoinGuess = "heads";
let clickAudioContext = null;

const WORDLE_WORDS = [
  "about", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again", "agent",
  "agree", "ahead", "alarm", "album", "alert", "alike", "alive", "allow", "alone", "along",
  "alter", "angel", "anger", "angle", "angry", "apart", "apple", "apply", "arena", "argue",
  "arise", "array", "aside", "asset", "audio", "audit", "avoid", "award", "aware", "awful",
  "badge", "baker", "bases", "basic", "beach", "began", "begin", "being", "below", "bench",
  "birth", "black", "blame", "blind", "block", "blood", "board", "boost", "bound", "brain",
  "brand", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown", "build",
  "built", "buyer", "cable", "carry", "catch", "cause", "chain", "chair", "chart", "chase",
  "cheap", "check", "chest", "chief", "child", "china", "chose", "civil", "claim", "class",
  "clean", "clear", "click", "clock", "close", "coach", "coast", "could", "count", "court",
  "cover", "craft", "crash", "cream", "crime", "cross", "crowd", "crown", "curve", "cycle",
  "daily", "dance", "dated", "dealt", "death", "delay", "depth", "doing", "doubt", "dozen",
  "draft", "drama", "drawn", "dream", "dress", "drill", "drink", "drive", "drove", "dying",
  "eager", "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "enter", "entry",
  "equal", "error", "event", "every", "exact", "exist", "extra", "faith", "false", "fault",
  "fiber", "field", "fifth", "fifty", "fight", "final", "first", "fixed", "flash", "fleet",
  "floor", "focus", "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud",
  "fresh", "front", "fruit", "fully", "funny", "furry", "giant", "given", "glass", "globe", "going",
  "grace", "grade", "grand", "grant", "grass", "great", "green", "gross", "group", "grown",
  "guard", "guess", "guest", "guide", "happy", "harry", "heart", "heavy", "hence", "honor",
  "horse", "hotel", "house", "human", "ideal", "image", "index", "inner", "input", "issue",
  "japan", "joint", "judge", "known", "killz", "kodex", "label", "large", "laser", "later", "laugh", "layer",
  "learn", "lease", "least", "leave", "legal", "level", "light", "limit", "local", "logic",
  "loose", "lower", "lucky", "lunch", "major", "maker", "march", "match", "maybe", "mayor",
  "meant", "media", "metal", "might", "minor", "minus", "mixed", "model", "money", "month",
  "moral", "motor", "mount", "mouse", "mouth", "movie", "music", "needs", "never", "newly",
  "night", "noise", "north", "novel", "nurse", "occur", "ocean", "offer", "often", "order",
  "other", "ought", "paint", "panel", "paper", "party", "peace", "peter", "phase", "phone",
  "photo", "piece", "pilot", "pitch", "place", "plain", "plane", "plant", "plate", "point",
  "pound", "power", "press", "price", "pride", "prime", "print", "prior", "prize", "proof",
  "proud", "prove", "queen", "quick", "quiet", "quite", "radio", "raise", "range", "rapid",
  "ratio", "reach", "ready", "refer", "right", "rival", "river", "rough", "round", "route",
  "royal", "rural", "scale", "scene", "scope", "score", "sense", "serve", "seven", "shall",
  "shape", "share", "sharp", "sheet", "shelf", "shell", "shift", "shine", "shirt", "shock",
  "shoot", "short", "shown", "sight", "since", "skill", "sleep", "slide", "small", "smart",
  "smile", "solid", "solve", "sorry", "sound", "south", "space", "spare", "speak", "speed",
  "spend", "spent", "split", "spoke", "sport", "stare", "staff", "stage", "stake", "stand", "start",
  "state", "steam", "steel", "stick", "still", "stock", "stone", "stood", "store", "storm",
  "story", "strip", "stuck", "study", "stuff", "style", "sugar", "suite", "super", "sweet",
  "table", "taken", "taste", "taxes", "teach", "teeth", "terry", "texas", "thank", "their",
  "theme", "there", "these", "thick", "thing", "think", "third", "those", "three", "throw",
  "tight", "times", "tired", "title", "today", "topic", "total", "touch", "tough", "tower",
  "track", "trade", "train", "treat", "trend", "trial", "tried", "tries", "truck", "truly",
  "trust", "truth", "twice", "under", "union", "unity", "until", "upper", "upset", "urban",
  "usage", "usual", "valid", "value", "video", "virus", "visit", "vital", "voice", "waste",
  "watch", "water", "wheel", "where", "which", "while", "white", "whole", "whose", "woman",
  "women", "world", "worry", "worse", "worst", "worth", "would", "write", "wrong", "wrote",
  "yield", "young", "youth"
];

const WORDLE_EXTRA_WORDS = [
  "abide", "abled", "abies", "acorn", "acrid", "added", "adder", "adept", "adieu", "admin",
  "adore", "adorn", "affix", "afire", "afoot", "afoul", "agate", "aging", "aglow", "agony",
  "aisle", "airy", "ajar", "algae", "alibi", "align", "allay", "allot", "alloy", "aloft",
  "altar", "amber", "amble", "amend", "amiss", "amity", "among", "ample", "amply", "amuse",
  "annex", "annoy", "anode", "antic", "anvil", "aorta", "apron", "aptly", "ardor", "armed",
  "armor", "aroma", "ascot", "ashen", "asked", "askew", "atoll", "attic", "augur", "aunty",
  "avail", "avert", "avian", "axial", "axiom", "azure", "bacon", "badly", "bagel", "baggy",
  "balsa", "banal", "banjo", "barge", "baron", "basin", "basil", "bathe", "baton", "bayou",
  "beard", "beast", "beech", "belch", "belle", "belly", "beret", "berry", "berth", "beset",
  "bicep", "biddy", "binge", "bingo", "biome", "birch", "bison", "bitty", "bland", "blast",
  "blaze", "bleak", "blend", "bless", "blimp", "blitz", "bloat", "bloom", "blown", "bluer",
  "bluff", "blunt", "blurb", "blurt", "blush", "boast", "boney", "bongo", "bonny", "booby",
  "booth", "borax", "boron", "bosom", "bough", "boxer", "brace", "brack", "brass", "brave",
  "bravo", "brawl", "brawn", "bribe", "brick", "bride", "brine", "brink", "brisk", "broil",
  "broth", "brunt", "brush", "brute", "buddy", "buggy", "bugle", "bulge", "bulky", "bully",
  "bunch", "bunny", "burly", "burnt", "burro", "bushy", "butch", "butte", "buxom", "cabin",
  "cacao", "cache", "cacti", "cadet", "cairn", "camel", "cameo", "canal", "candy", "canny",
  "canoe", "canon", "caper", "carat", "cargo", "carol", "carve", "caste", "cater", "caulk",
  "cavil", "cedar", "cello", "chaff", "chalk", "champ", "chant", "chaos", "chard", "charm",
  "chasm", "cheat", "cheek", "cheer", "chime", "chirp", "choir", "chord", "chore", "cider",
  "cigar", "cinch", "circa", "civic", "clack", "clamp", "clang", "clank", "clasp", "clerk",
  "cleat", "cleft", "climb", "cling", "clink", "cloak", "clone", "cloth", "cloud", "clout",
  "clove", "clown", "cluck", "clued", "clump", "clung", "coach", "cobra", "comet", "comma",
  "conch", "condo", "copse", "coral", "corny", "coupe", "covet", "cower", "coyly", "cramp",
  "crane", "crank", "crate", "crave", "crawl", "craze", "creak", "creed", "creep", "creme",
  "crepe", "cress", "crest", "cried", "crisp", "croak", "crock", "crone", "crook", "croup",
  "crude", "crumb", "crush", "crust", "crypt", "cumin", "curio", "curly", "curry", "curse",
  "cutie", "cyber", "daddy", "daisy", "dally", "damask", "dandy", "davit", "debit", "debug",
  "decor", "defer", "deity", "delta", "dense", "depot", "deter", "detox", "deuce", "devil",
  "diary", "digit", "diner", "dingy", "dirge", "disco", "ditto", "diver", "dizzy", "dodge",
  "dogma", "dolce", "donor", "donut", "dopey", "dorky", "dowel", "downy", "dread", "dried",
  "drier", "drool", "droop", "drown", "druid", "drunk", "dryer", "duchy", "dully", "dummy",
  "dumpy", "dusky", "dusty", "dutch", "dwarf", "dwell", "easel", "ebony", "edict", "eerie",
  "egret", "eject", "elder", "elect", "elope", "elude", "email", "embed", "ember", "emcee",
  "emery", "emoji", "endue", "enema", "erect", "erode", "ether", "ethic", "ethos", "evade",
  "evoke", "fable", "facet", "faint", "fairy", "fancy", "fanny", "farce", "fared", "farro",
  "ferry", "fetal", "fetch", "fever", "fewer", "finer", "fizzy", "fjord", "flail", "flake",
  "flame", "flank", "flare", "flask", "flavor", "fleck", "flick", "flier", "fling", "flint",
  "float", "flock", "flora", "floss", "flour", "flown", "fluff", "fluid", "fluke", "flume",
  "flung", "flunk", "flush", "flute", "foamy", "folio", "foray", "forge", "forgo", "fossa",
  "fouls", "freak", "freer", "fried", "frill", "frisk", "frock", "froth", "frown", "fudge",
  "fugue", "funky", "furor", "furry", "fussy", "gains", "gamer", "gamma", "gassy", "gaudy",
  "gauze", "gavel", "gecko", "geese", "genie", "genre", "ghost", "ghoul", "giddy", "girly",
  "given", "gizmo", "glade", "gland", "glare", "gleam", "glide", "gloat", "gloom", "glory",
  "gloss", "glove", "glyph", "gnash", "gnome", "godly", "golly", "goofy", "gorge", "gouge",
  "grape", "graph", "grasp", "grate", "gravy", "graze", "grief", "grill", "grime", "grimy",
  "grind", "gripe", "groan", "groin", "groom", "grove", "growl", "gruff", "grunt", "guava",
  "guild", "gulch", "gumbo", "gusto", "gypsy", "habby", "hairy", "handy", "hardy", "harem",
  "harsh", "hasty", "hatch", "haunt", "haven", "hazel", "heady", "heard", "heath", "hedge",
  "hefty", "helix", "hello", "heron", "hilly", "hinge", "hippo", "hippy", "hitch", "hoard",
  "hobby", "honey", "horde", "hound", "hovel", "howdy", "humid", "humor", "hurry", "husky",
  "hymen", "icing", "igloo", "iliac", "imply", "inbox", "incur", "inert", "ingot", "inlet",
  "inlay", "inter", "ionic", "irate", "irony", "itchy", "ivory", "jaunt", "jazzy", "jelly",
  "jerky", "jiffy", "jolly", "joust", "judge", "juicy", "jumbo", "jumpy", "kayak", "kebab",
  "khaki", "kiosk", "kitty", "knack", "knelt", "knife", "knock", "known", "koala", "label",
  "labor", "laden", "ladle", "lager", "lance", "lanky", "lapel", "lapse", "larch", "larva",
  "lasso", "latte", "laude", "leafy", "leaky", "leech", "lefty", "lemon", "lemur", "leper",
  "libel", "lilac", "limbo", "linen", "lingo", "lithe", "liver", "livid", "llama", "loamy",
  "lobby", "lodge", "lofty", "lolly", "loner", "lotto", "louse", "lousy", "lunar", "lurch",
  "lusty", "lyric", "macho", "macro", "madam", "madly", "maize", "mambo", "manga", "mangy",
  "manic", "manly", "manor", "maple", "marsh", "masse", "matey", "mauve", "meaty", "medal",
  "melon", "mercy", "merry", "messy", "meter", "metro", "midge", "midst", "milky", "mimic",
  "mince", "mirth", "missy", "miter", "mocha", "modal", "mogul", "moist", "moldy", "molly",
  "mossy", "motel", "mould", "mourn", "mousy", "mover", "mucus", "muddy", "mural", "murky",
  "mushy", "musty", "myrrh", "nacho", "nadir", "naive", "nanny", "nasty", "naval", "needy",
  "nerdy", "newer", "nicer", "niche", "ninja", "ninth", "noble", "nobly", "nodal", "noisy",
  "nomad", "noose", "norma", "notch", "nudge", "nugget", "nymph", "oaken", "oasis", "obese",
  "oily", "olive", "omega", "onion", "onset", "opera", "opium", "optic", "orbit", "organ",
  "otter", "ounce", "ovary", "ovine", "owned", "owner", "oxide", "ozone", "paddy", "pagan",
  "pager", "paler", "palsy", "panda", "panic", "pansy", "pants", "parka", "parse", "pasta",
  "pasty", "patch", "patio", "patsy", "pause", "payer", "peace", "pearl", "pecan", "pedal",
  "penne", "penny", "perch", "peril", "petal", "petty", "piety", "piggy", "pinch", "piney",
  "pinto", "piper", "pique", "pithy", "pivot", "pixel", "plaid", "plait", "plank", "plaza",
  "plead", "pluck", "plumb", "plume", "plush", "poach", "polka", "polyp", "poppy", "porch",
  "poser", "posit", "posse", "pouch", "prank", "prawn", "preen", "press", "prick", "primo",
  "prism", "privy", "prone", "prong", "prose", "proxy", "psalm", "puffy", "pulse", "punch",
  "pupal", "pupil", "puppy", "puree", "purer", "purge", "quack", "quail", "quake", "qualm",
  "quart", "quash", "quasi", "quell", "query", "quest", "queue", "quill", "quilt", "quirk",
  "rabid", "radar", "rainy", "rally", "ramen", "ranch", "randy", "raven", "rayon", "razor",
  "react", "rebar", "rebel", "recap", "recur", "reedy", "regal", "rehab", "reign", "relax",
  "relic", "remix", "repay", "rerun", "reset", "resin", "retro", "rhyme", "rider", "ridge",
  "rifle", "rigid", "rinse", "ripen", "risen", "risky", "roast", "robin", "robot", "rocky",
  "rogue", "roomy", "roost", "rosin", "rotor", "rouge", "rowdy", "ruddy", "ruler", "rumba",
  "rumor", "runny", "safer", "salsa", "salty", "salve", "sandy", "satin", "satyr", "sauna",
  "savvy", "scald", "scalp", "scaly", "scare", "scarf", "scary", "scent", "scoff", "scold",
  "scoop", "scoot", "scour", "scowl", "scram", "scrap", "screw", "scrub", "scuba", "sedan",
  "sepia", "serum", "sever", "sewer", "shack", "shade", "shady", "shaft", "shaky", "shame",
  "shank", "shard", "shawl", "shear", "sheen", "sheep", "sheer", "sherd", "shied", "shiny",
  "shirk", "shoal", "shore", "shout", "shove", "shown", "shrew", "shrub", "shrug", "shunt",
  "siege", "sieve", "silky", "silly", "siren", "sissy", "skate", "skein", "skier", "skimp",
  "skirt", "skulk", "skull", "skunk", "slack", "slang", "slant", "slash", "slate", "sleek",
  "slept", "slice", "slick", "slime", "slimy", "sling", "slink", "sloop", "slosh", "sloth",
  "slump", "slung", "slurp", "slush", "smack", "smelt", "smirk", "smock", "smoky", "snack",
  "snail", "snake", "snare", "snarl", "sneak", "sneer", "sniff", "snipe", "snoop", "snore",
  "snort", "snout", "snuck", "snuff", "soapy", "soggy", "solar", "sonar", "sonic", "sooth",
  "sooty", "sower", "spade", "spank", "spasm", "spelt", "spice", "spicy", "spike", "spiky",
  "spine", "spiny", "spire", "spite", "splat", "splay", "spoil", "spool", "spore", "spray",
  "sprig", "spunk", "spurn", "squad", "squat", "squid", "stain", "stale", "stalk", "stark",
  "stash", "stave", "stead", "steak", "steal", "steed", "stein", "stern", "sting", "stink",
  "stint", "stoic", "stoke", "stole", "stomp", "stony", "stool", "stork", "stout", "straw",
  "stray", "strep", "strew", "strut", "stump", "stung", "stunk", "suave", "sunny", "surge",
  "sushi", "swami", "swamp", "swarm", "swash", "sweat", "swept", "swift", "swine", "swing",
  "swirl", "swoop", "sword", "sworn", "tabby", "taker", "tally", "tangy", "taper", "tarot",
  "taunt", "tawny", "teary", "tempo", "tenor", "tense", "tepid", "thank", "thrum", "thyme",
  "tibia", "tidal", "tiger", "tilde", "timer", "timid", "tinge", "tinny", "tipsy", "toast",
  "token", "tonal", "tonic", "tooth", "torch", "torso", "totem", "toxic", "trace", "tract",
  "tramp", "trawl", "truce", "trunk", "tulip", "tumor", "tunic", "turbo", "tweak", "tweed",
  "twirl", "twist", "ulcer", "ultra", "umbra", "uncle", "uncut", "unfed", "unfit", "unify",
  "unite", "unlit", "unmet", "unset", "untie", "urban", "urine", "utter", "vague", "valet",
  "vapor", "vault", "vegan", "venom", "venue", "verse", "vinyl", "viper", "vista", "vixen",
  "vocal", "vodka", "vogue", "wafer", "waive", "waltz", "warty", "weary", "weave", "weird",
  "welch", "welsh", "whale", "wheat", "whiff", "whine", "whiny", "whirl", "whisk", "whist",
  "widow", "wight", "wince", "windy", "wiser", "wispy", "witch", "witty", "woody", "woozy",
  "wordy", "wormy", "wrack", "wrath", "wreak", "wring", "wrist", "wryly", "xenon", "yacht",
  "yeast", "yokel", "zebra", "zesty", "zonal", "abbey", "abbot", "abode", "abort",
  "abuzz", "adage", "adobo", "agape", "agile", "agora", "airer", "akita", "alder",
  "aline", "aloud", "amass", "amino", "anise", "ankle", "annal", "annul", "argot",
  "arson", "asker", "atone", "attar", "auger", "axion", "bawdy", "beget", "belie",
  "beryl", "bilge", "biter", "blare", "bleep", "bliss", "bloke", "bogus", "boozy",
  "briar", "brood", "broom", "bursa", "cabby", "cagey", "calyx", "cares", "carom",
  "cease", "chili", "chill", "chomp", "chunk", "civet", "clash", "cocoa", "colon",
  "corgi", "crier", "cubic", "cynic", "datum", "decry", "demon", "demur", "denim",
  "dingo", "ditsy", "dolly", "doter", "dowry", "dross", "duvet", "eclat", "edify",
  "elegy", "ennui", "ensue", "epoch", "epoxy", "equip", "erupt", "essay", "ester",
  "expel", "extol", "fakir", "fecal", "femur", "feral", "filer", "filly", "finch",
  "firth", "flair", "foist", "fount", "foyer", "frond", "frost", "fryer", "gawky",
  "geode", "girth", "glint", "gnarl", "golem", "goner", "gully", "hiker", "homer",
  "hunch", "hyena", "idiom", "idyll", "inane", "knead", "kneel", "kneed", "lamer",
  "lathe", "leapt", "lento", "lumen", "mason", "matte", "maxim", "miser", "mixer",
  "motto", "mynah", "nasal", "nervy", "nexus", "olden", "opine", "ovoid", "plunk",
  "prude", "quark", "radon", "radii", "rarer", "recut", "redid", "renal", "rhino",
  "riper", "riser", "rivet", "rondo", "ruder", "sadly", "savor", "scion", "sedge",
  "segue", "seine", "shale", "shorn", "shuck", "sinew", "skald", "slunk", "snaky",
  "snide", "sober", "sonny", "spied", "stagy", "stilt", "stoat", "stove", "sulky",
  "surly", "tacet", "talon", "tapir", "tarry", "tater", "throb", "tippy", "tizzy",
  "topaz", "torus", "tryst", "udder", "uncap", "unpin", "vicar", "vigil", "vigor",
  "villa", "viola", "voter", "waken", "waver", "whelp", "woken", "wooly", "yodel",
  "zippy"
];

const WORDLE_ALL_WORDS = Array.from(new Set([...WORDLE_WORDS, ...WORDLE_EXTRA_WORDS])).filter(
  (word) => /^[a-z]{5}$/.test(word)
);
const WORDLE_WORD_LENGTH = 5;
const WORDLE_MAX_GUESSES = 6;
const WORDLE_KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const ACHIEVEMENTS = [
  { id: "first-click", title: "First Crashout", description: "Click GamingGuy once." },
  { id: "click-1000", title: "Click Machine", description: "Click GamingGuy 1,000 times." },
  { id: "click-10000", title: "Turbo Tapping", description: "Click GamingGuy 10,000 times." },
  { id: "earned-500", title: "Getting Loud", description: "Earn 500 total crashouts." },
  { id: "earned-5000", title: "Crashout Legend", description: "Earn 5,000 total crashouts." },
  { id: "earned-100000", title: "Crashout Empire", description: "Earn 100,000 total crashouts." },
  { id: "earned-1000000", title: "Million Meltdown", description: "Earn 1,000,000 total crashouts." },
  { id: "earned-10000000", title: "Mega Meltdown", description: "Earn 10,000,000 total crashouts." },
  { id: "cps-25", title: "Production Line", description: "Reach 25 crashouts per second." },
  { id: "cps-1000", title: "Factory Floor", description: "Reach 1,000 crashouts per second." },
  { id: "cps-10000", title: "Overclocked", description: "Reach 10,000 crashouts per second." },
  { id: "owned-10", title: "Collector", description: "Own 10 total upgrades." },
  { id: "owned-50", title: "Hoarder", description: "Own 50 total upgrades." },
  { id: "owned-100", title: "Army Builder", description: "Own 100 total upgrades." },
  { id: "all-upgrades", title: "Full Squad", description: "Own at least one of each upgrade." },
  { id: "owned-67-each", title: "67", description: "Own at least 67 of every upgrade." },
  { id: "rebirth-1", title: "Ragequit", description: "Perform your first ragequit." },
  { id: "rebirth-3", title: "AUGGGGGHHHH", description: "Reach 3 ragequits." },
  { id: "rebirth-5", title: "Reborn Again", description: "Reach 5 ragequits." },
  { id: "rebirth-10", title: "Infinite Tilt", description: "Reach 10 ragequits." },
  {
    id: "reset-once",
    title: "Fresh Start",
    description: "Reset your progress once. This achievement is permanent.",
  },
  { id: "power-5", title: "Power Spark", description: "Reach 5 total upgrade power levels." },
  { id: "power-15", title: "Power Surge", description: "Reach 15 total upgrade power levels." },
  { id: "power-30", title: "Power Core", description: "Reach 30 total upgrade power levels." },
  { id: "wordle-play-1", title: "Word Rookie", description: "Finish one Wordle game." },
  { id: "wordle-loss-1", title: "Close One", description: "Lose one Wordle game." },
  { id: "wordle-loss-10", title: "Still Swinging", description: "Lose 10 Wordle games." },
  { id: "wordle-win-1", title: "Word Winner", description: "Win one Wordle game." },
  { id: "wordle-win-10", title: "Word Veteran", description: "Win 10 Wordle games." },
  { id: "wordle-win-25", title: "Lexicon Lord", description: "Win 25 Wordle games." },
  { id: "wordle-streak-3", title: "Word Streak", description: "Win 3 Wordle games in a row." },
  { id: "wordle-streak-5", title: "Word Monster", description: "Win 5 Wordle games in a row." },
  { id: "wordle-streak-10", title: "Unstoppable Speller", description: "Win 10 Wordle games in a row." },
  { id: "wordle-fast", title: "Sharp Solver", description: "Win a Wordle game in 3 guesses or less." },
  { id: "wordle-lightning", title: "Lightning Solver", description: "Win a Wordle game in 2 guesses or less." },
  { id: "wordle-play-10", title: "Daily Grinder", description: "Finish 10 Wordle games." },
  { id: "wordle-play-50", title: "Word Addict", description: "Finish 50 Wordle games." },
  { id: "wordle-play-100", title: "Dictionary Dweller", description: "Finish 100 Wordle games." },
];

let wordleTarget = "";
let wordleGuesses = [];
let wordleGameOver = false;
let wordleLetterStatuses = {};

function getTotalOwnedUpgrades() {
  return upgrades.reduce((sum, upgrade) => sum + upgrade.owned, 0);
}

function getTotalPowerLevels() {
  return upgrades.reduce((sum, upgrade) => sum + (upgrade.powerLevel || 0), 0);
}

function getInitialPowerCost(upgrade) {
  return Math.floor(upgrade.baseCost * 15);
}

function getUpgradePowerMultiplier(upgrade) {
  return Math.pow(POWER_MULTIPLIER_PER_LEVEL, upgrade.powerLevel || 0);
}

function getUpgradeUnitCps(upgrade) {
  if (upgrade.owned <= 0) {
    return upgrade.pps * getUpgradePowerMultiplier(upgrade);
  }

  const ownedScalingMultiplier = 1 + (upgrade.owned - 1) * 0.06;
  return upgrade.pps * getUpgradePowerMultiplier(upgrade) * ownedScalingMultiplier;
}

function getUpgradeTotalCps(upgrade) {
  if (upgrade.owned <= 0) {
    return 0;
  }

  return getUpgradeUnitCps(upgrade) * upgrade.owned;
}

function calculateBaseCps() {
  return upgrades.reduce((sum, upgrade) => sum + getUpgradeTotalCps(upgrade), 0);
}

const upgrades = [
  {
    id: 1,
    name: "GamingGuy907",
    image: "Images/GamingGuy907pfp.jpg",
    baseCost: 20,
    cost: 20,
    pps: 1,
    powerLevel: 0,
    powerCost: 300,
    owned: 0,
  },
  {
    id: 2,
    name: "Kodex13",
    image: "Images/Kodex13pfp.jpg",
    baseCost: 75,
    cost: 75,
    pps: 4,
    powerLevel: 0,
    powerCost: 1125,
    owned: 0,
  },
  {
    id: 3,
    name: "Smarsian",
    image: "Images/Smarsianpfp.jpg",
    baseCost: 250,
    cost: 250,
    pps: 12,
    powerLevel: 0,
    powerCost: 3750,
    owned: 0,
  },
  {
    id: 4,
    name: "AlexTK473",
    image: "Images/AlexTKpfp.jpg",
    baseCost: 700,
    cost: 700,
    pps: 28,
    powerLevel: 0,
    powerCost: 10500,
    owned: 0,
  },
  {
    id: 5,
    name: "JuztKillz",
    image: "Images/Killzpfp.jpg",
    baseCost: 1800,
    cost: 1800,
    pps: 65,
    powerLevel: 0,
    powerCost: 27000,
    owned: 0,
  },
];

function saveProgress() {
  const payload = {
    score,
    pointsPerSecond,
    rebirthCount,
    rebirthCost,
    totalCrashoutsEarned,
    totalCookieClicks,
    wordleGamesPlayed,
    wordleWins,
    wordleLosses,
    wordleCurrentStreak,
    wordleBestStreak,
    wordleBestGuessCount,
    unlockedAchievements: Array.from(unlockedAchievements),
    upgrades: upgrades.map((upgrade) => ({
      id: upgrade.id,
      cost: upgrade.cost,
      owned: upgrade.owned,
      powerLevel: upgrade.powerLevel,
      powerCost: upgrade.powerCost,
    })),
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
}

function savePermanentAchievements() {
  localStorage.setItem(PERMANENT_ACHIEVEMENTS_KEY, JSON.stringify(Array.from(permanentAchievements)));
}

function loadPermanentAchievements() {
  const raw = localStorage.getItem(PERMANENT_ACHIEVEMENTS_KEY);
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      parsed.forEach((achievementId) => {
        if (typeof achievementId === "string") {
          permanentAchievements.add(achievementId);
        }
      });
    }
  } catch {
    localStorage.removeItem(PERMANENT_ACHIEVEMENTS_KEY);
  }
}

function loadProgress() {
  const rawSave = localStorage.getItem(SAVE_KEY);
  if (!rawSave) {
    return;
  }

  try {
    const save = JSON.parse(rawSave);
    if (typeof save.score === "number" && Number.isFinite(save.score)) {
      score = Math.max(0, save.score);
    }

    if (typeof save.rebirthCount === "number" && Number.isFinite(save.rebirthCount)) {
      rebirthCount = Math.max(0, Math.floor(save.rebirthCount));
    }

    if (typeof save.rebirthCost === "number" && Number.isFinite(save.rebirthCost)) {
      rebirthCost = Math.max(1, Math.floor(save.rebirthCost));
    } else {
      rebirthCost = calculateRebirthCost(rebirthCount);
    }

    if (typeof save.totalCrashoutsEarned === "number" && Number.isFinite(save.totalCrashoutsEarned)) {
      totalCrashoutsEarned = Math.max(0, save.totalCrashoutsEarned);
    }

    if (typeof save.totalCookieClicks === "number" && Number.isFinite(save.totalCookieClicks)) {
      totalCookieClicks = Math.max(0, Math.floor(save.totalCookieClicks));
    }

    if (typeof save.wordleGamesPlayed === "number" && Number.isFinite(save.wordleGamesPlayed)) {
      wordleGamesPlayed = Math.max(0, Math.floor(save.wordleGamesPlayed));
    }

    if (typeof save.wordleWins === "number" && Number.isFinite(save.wordleWins)) {
      wordleWins = Math.max(0, Math.floor(save.wordleWins));
    }

    if (typeof save.wordleLosses === "number" && Number.isFinite(save.wordleLosses)) {
      wordleLosses = Math.max(0, Math.floor(save.wordleLosses));
    }

    if (typeof save.wordleCurrentStreak === "number" && Number.isFinite(save.wordleCurrentStreak)) {
      wordleCurrentStreak = Math.max(0, Math.floor(save.wordleCurrentStreak));
    }

    if (typeof save.wordleBestStreak === "number" && Number.isFinite(save.wordleBestStreak)) {
      wordleBestStreak = Math.max(0, Math.floor(save.wordleBestStreak));
    }

    if (
      typeof save.wordleBestGuessCount === "number" &&
      Number.isFinite(save.wordleBestGuessCount)
    ) {
      wordleBestGuessCount = Math.max(1, Math.floor(save.wordleBestGuessCount));
    }

    if (Array.isArray(save.unlockedAchievements)) {
      save.unlockedAchievements.forEach((achievementId) => {
        if (typeof achievementId === "string") {
          unlockedAchievements.add(achievementId);
        }
      });
    }

    if (Array.isArray(save.upgrades)) {
      save.upgrades.forEach((savedUpgrade, index) => {
        const upgrade = upgrades[index];
        if (!upgrade || savedUpgrade.id !== upgrade.id) {
          return;
        }

        if (typeof savedUpgrade.owned === "number" && Number.isFinite(savedUpgrade.owned)) {
          upgrade.owned = Math.max(0, Math.floor(savedUpgrade.owned));
        }

        if (typeof savedUpgrade.cost === "number" && Number.isFinite(savedUpgrade.cost)) {
          upgrade.cost = Math.max(1, Math.floor(savedUpgrade.cost));
        } else {
          upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        }

        if (typeof savedUpgrade.powerLevel === "number" && Number.isFinite(savedUpgrade.powerLevel)) {
          upgrade.powerLevel = Math.max(0, Math.floor(savedUpgrade.powerLevel));
        } else {
          upgrade.powerLevel = 0;
        }

        if (typeof savedUpgrade.powerCost === "number" && Number.isFinite(savedUpgrade.powerCost)) {
          upgrade.powerCost = Math.max(1, Math.floor(savedUpgrade.powerCost));
        } else {
          upgrade.powerCost = Math.floor(getInitialPowerCost(upgrade) * Math.pow(3, upgrade.powerLevel));
        }
      });
    }

    // Recalculate base CPS from full upgrade state to prevent stale totals.
    pointsPerSecond = calculateBaseCps();
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }
}

function saveSettings() {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      adsEnabled,
    })
  );
}

function loadSettings() {
  const rawSettings = localStorage.getItem(SETTINGS_KEY);
  if (!rawSettings) {
    return;
  }

  try {
    const settings = JSON.parse(rawSettings);
    if (typeof settings.adsEnabled === "boolean") {
      adsEnabled = settings.adsEnabled;
    }
  } catch {
    localStorage.removeItem(SETTINGS_KEY);
  }
}

function applyAdsToggleState() {
  if (adsToggle) {
    adsToggle.checked = adsEnabled;
  }

  if (!adsEnabled && !adOverlay.classList.contains("hidden")) {
    closeAdPrompt();
  }
}

function playGamingGuyClickSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  if (!clickAudioContext) {
    clickAudioContext = new AudioContextClass();
  }

  if (clickAudioContext.state === "suspended") {
    clickAudioContext.resume().catch(() => {
      // Ignore resume errors and continue silently.
    });
  }

  const now = clickAudioContext.currentTime;
  const oscillator = clickAudioContext.createOscillator();
  const gain = clickAudioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(820, now);
  oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.03);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.11, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  oscillator.connect(gain);
  gain.connect(clickAudioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.05);
}

function handleGamingGuyClick(shouldSave = true, shouldPlaySound = false) {
  const clickGain = getRebirthMultiplier() * getWordleStreakMultiplier();
  score += clickGain;
  totalCrashoutsEarned += clickGain;
  totalCookieClicks += 1;

  if (shouldPlaySound) {
    playGamingGuyClickSound();
  }

  updateDisplay();

  if (shouldSave) {
    saveProgress();
  }
}

function setCoinGuess(side) {
  selectedCoinGuess = side;

  if (coinGuessHeads && coinGuessTails) {
    const headsActive = side === "heads";
    coinGuessHeads.classList.toggle("active", headsActive);
    coinGuessTails.classList.toggle("active", !headsActive);
    coinGuessHeads.setAttribute("aria-pressed", String(headsActive));
    coinGuessTails.setAttribute("aria-pressed", String(!headsActive));
  }
}

function updateCoinVisual(side) {
  if (!coinVisual || !coinVisualText) {
    return;
  }

  coinVisual.classList.remove("waiting", "heads", "tails", "flip");

  if (side !== "heads" && side !== "tails") {
    coinVisual.classList.add("waiting");
    coinVisualText.textContent = "?";
    return;
  }

  coinVisual.classList.add(side);
  coinVisualText.textContent = side.toUpperCase();

  // Restart flip animation each time a result appears.
  void coinVisual.offsetWidth;
  coinVisual.classList.add("flip");
}

function handleCoinFlip() {
  if (!coinBetInput || !coinResult || !coinFace) {
    return;
  }

  const wager = Math.floor(Number(coinBetInput.value));
  const available = Math.floor(score);

  if (!Number.isFinite(wager) || wager < 1) {
    coinResult.textContent = "Enter a valid wager of at least 1 crashout.";
    return;
  }

  if (wager > available) {
    coinResult.textContent = "Not enough crashouts for that wager.";
    return;
  }

  score -= wager;

  const flip = Math.random() < 0.5 ? "heads" : "tails";
  updateCoinVisual(flip);
  coinFace.textContent = `Coin: ${flip.toUpperCase()}`;

  if (flip === selectedCoinGuess) {
    const payout = wager * 2;
    score += payout;
    totalCrashoutsEarned += payout;
    coinResult.textContent = `You called it! +${formatNumber(payout)} crashouts.`;
  } else {
    coinResult.textContent = `Wrong call. You lost ${formatNumber(wager)} crashouts.`;
  }

  updateDisplay();
  saveProgress();
}

function resetWordleProgress() {
  wordleGamesPlayed = 0;
  wordleWins = 0;
  wordleLosses = 0;
  wordleCurrentStreak = 0;
  wordleBestStreak = 0;
  wordleBestGuessCount = null;

  wordleGuesses = [];
  wordleGameOver = false;
  wordleLetterStatuses = {};
}

function resetUpgradeProgress() {
  upgrades.forEach((upgrade) => {
    upgrade.owned = 0;
    upgrade.cost = upgrade.baseCost;
    upgrade.powerLevel = 0;
    upgrade.powerCost = getInitialPowerCost(upgrade);
  });
}

function resetProgress() {
  permanentAchievements.add("reset-once");
  savePermanentAchievements();

  score = 0;
  pointsPerSecond = 0;
  rebirthCount = 0;
  rebirthCost = REBIRTH_BASE_COST;

  totalCrashoutsEarned = 0;
  totalCookieClicks = 0;
  resetWordleProgress();
  unlockedAchievements.clear();
  resetUpgradeProgress();

  adBoostActiveUntil = 0;
  if (adBoostTimeoutId) {
    clearTimeout(adBoostTimeoutId);
    adBoostTimeoutId = null;
  }

  adAutoClickerActiveUntil = 0;
  if (adAutoClickerTimeoutId) {
    clearTimeout(adAutoClickerTimeoutId);
    adAutoClickerTimeoutId = null;
  }

  if (adAutoClickerIntervalId) {
    clearInterval(adAutoClickerIntervalId);
    adAutoClickerIntervalId = null;
  }

  localStorage.removeItem(SAVE_KEY);
  startNewWordleGame();
  renderAchievements();
  updateDisplay();
  playResetCrashoutSound();
}

function calculateRebirthCost(count) {
  return Math.floor(REBIRTH_BASE_COST * Math.pow(5, count));
}

function getRebirthMultiplier() {
  return 1 + rebirthCount;
}

function getWordleStreakMultiplier() {
  return 1 + wordleCurrentStreak * 0.1;
}

function getEffectiveCps() {
  return (
    pointsPerSecond * getRebirthMultiplier() * getWordleStreakMultiplier() * getAdProductionMultiplier()
  );
}

function getAdProductionMultiplier() {
  return Date.now() < adBoostActiveUntil ? AD_PRODUCTION_MULTIPLIER : 1;
}

function pickRandomAdMedia() {
  return AD_MEDIA_SOURCES[Math.floor(Math.random() * AD_MEDIA_SOURCES.length)];
}

function stopAdAudio(resetSource = false) {
  adAudio.pause();
  adAudio.currentTime = 0;

  if (resetSource) {
    adAudio.removeAttribute("src");
    adAudio.load();
  }
}

function syncAdAudioToVideo() {
  if (!adAudio.src || adVideo.readyState < 1) {
    return;
  }

  const drift = Math.abs(adAudio.currentTime - adVideo.currentTime);
  if (drift > 0.35) {
    adAudio.currentTime = adVideo.currentTime;
  }
}

function openAdPrompt() {
  if (!adOverlay.classList.contains("hidden")) {
    return;
  }

  adMessage.textContent = "Watch a Fortnite2 Speedrun ad for a random bonus reward.";
  adPromptActions.classList.remove("hidden");
  adPlayerWrap.classList.add("hidden");
  adCloseButton.classList.add("hidden");
  adOverlay.classList.remove("hidden");
  adPromptCooldownUntil = Date.now() + AD_PROMPT_COOLDOWN_MS;
}

function closeAdPrompt() {
  adVideo.pause();
  adVideo.removeAttribute("src");
  adVideo.load();
  stopAdAudio(true);
  currentAdMedia = null;
  adOverlay.classList.add("hidden");
}

function startAdWatch() {
  const media = pickRandomAdMedia();
  currentAdMedia = media;

  stopAdAudio(true);
  adVideo.pause();
  adVideo.currentTime = 0;
  adVideo.muted = true;
  adVideo.defaultMuted = true;
  adVideo.volume = 1;
  adVideo.controls = true;
  adVideo.src = media.video;
  adVideo.load();

  adAudio.src = media.audio;
  adAudio.currentTime = 0;
  adAudio.volume = 1;
  adAudio.load();

  adPromptActions.classList.add("hidden");
  adPlayerWrap.classList.remove("hidden");
  adCloseButton.classList.add("hidden");
  adMessage.textContent = "Watch the full ad to claim a random bonus reward.";

  adVideo.play().then(() => {
    adAudio.currentTime = adVideo.currentTime;
    adAudio.play().catch(() => {
      adVideo.muted = false;
      adVideo.defaultMuted = false;
      adMessage.textContent = "Press play to start the ad. If muted, unmute in video controls.";
    });
  }).catch(() => {
    adMessage.textContent = "Press play and make sure the video is unmuted to start watching the ad.";
    adVideo.controls = true;
  });
}

function applyAdProductionBoost() {
  adBoostActiveUntil = Date.now() + AD_BOOST_DURATION_MS;

  if (adBoostTimeoutId) {
    clearTimeout(adBoostTimeoutId);
  }

  adBoostTimeoutId = setTimeout(() => {
    updateDisplay();
  }, AD_BOOST_DURATION_MS + 50);

  updateDisplay();
}

function startAdAutoClicker() {
  adAutoClickerActiveUntil = Date.now() + AD_AUTOCLICK_DURATION_MS;

  if (adAutoClickerTimeoutId) {
    clearTimeout(adAutoClickerTimeoutId);
  }

  if (adAutoClickerIntervalId) {
    clearInterval(adAutoClickerIntervalId);
  }

  adAutoClickerIntervalId = setInterval(() => {
    if (Date.now() >= adAutoClickerActiveUntil) {
      clearInterval(adAutoClickerIntervalId);
      adAutoClickerIntervalId = null;
      return;
    }

    handleGamingGuyClick(false);
  }, AD_AUTOCLICK_INTERVAL_MS);

  adAutoClickerTimeoutId = setTimeout(() => {
    if (adAutoClickerIntervalId) {
      clearInterval(adAutoClickerIntervalId);
      adAutoClickerIntervalId = null;
    }

    updateDisplay();
  }, AD_AUTOCLICK_DURATION_MS + AD_AUTOCLICK_INTERVAL_MS);
}

function applyRandomAdReward() {
  if (Math.random() < 0.5) {
    applyAdProductionBoost();
    return "Reward claimed: 2x production for 2 seconds!";
  }

  startAdAutoClicker();
  return "Reward claimed: Auto-clicker on GamingGuy for 30 seconds!";
}

function maybeShowRandomAdPrompt() {
  if (!adsEnabled) {
    return;
  }

  const now = Date.now();
  if (now < adPromptCooldownUntil) {
    return;
  }

  if (!adOverlay.classList.contains("hidden")) {
    return;
  }

  if (Math.random() < 0.35) {
    openAdPrompt();
  }
}

function tryRebirth() {
  playResetCrashoutSound();

  if (score < rebirthCost) {
    return;
  }

  score = 0;
  pointsPerSecond = 0;
  rebirthCount += 1;
  rebirthCost = calculateRebirthCost(rebirthCount);

  upgrades.forEach((upgrade) => {
    upgrade.owned = 0;
    upgrade.cost = upgrade.baseCost;
    upgrade.powerLevel = 0;
    upgrade.powerCost = getInitialPowerCost(upgrade);
  });

  updateDisplay();
  saveProgress();
}

function playResetCrashoutSound() {
  resetCrashoutAudio.currentTime = 0;
  resetCrashoutAudio.play().catch(() => {
    // Ignore autoplay or decode errors without interrupting gameplay.
  });
}

function openResetConfirm() {
  confirmOverlay.classList.remove("hidden");
}

function closeResetConfirm() {
  confirmOverlay.classList.add("hidden");
}

function formatNumber(value) {
  return Math.floor(value).toLocaleString();
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    countdownElement.textContent = "It is September 6, 2026!";
    if (!birthdayCelebrationShown) {
      showBirthdayCelebration();
      birthdayCelebrationShown = true;
    }
    return;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function launchConfetti() {
  const colors = ["#ff5f5f", "#ffd966", "#7de1ff", "#9dff8f", "#d3a6ff", "#ff9ed2"];
  confettiLayer.innerHTML = "";

  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${3 + Math.random() * 2.6}s`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
  }
}

function showBirthdayCelebration() {
  birthdayOverlay.classList.remove("hidden");
  launchConfetti();
}

function closeBirthdayCelebration() {
  birthdayOverlay.classList.add("hidden");
}

function setActiveSidebarTab(tabName) {
  const showAchievements = tabName === "achievements";
  upgradesPanel.classList.toggle("hidden", showAchievements);
  achievementsPanel.classList.toggle("hidden", !showAchievements);
  showUpgradesTab.classList.toggle("active", !showAchievements);
  showAchievementsTab.classList.toggle("active", showAchievements);
  showUpgradesTab.setAttribute("aria-selected", String(!showAchievements));
  showAchievementsTab.setAttribute("aria-selected", String(showAchievements));
}

function getAchievementProgress(achievementId) {
  const safeFloor = (value) => Math.max(0, Math.floor(value));
  const totalOwnedUpgrades = getTotalOwnedUpgrades();
  const totalPowerLevels = getTotalPowerLevels();
  const upgradesOwnedAtLeastOne = upgrades.filter((upgrade) => upgrade.owned >= 1).length;
  const upgradesOwnedAtLeast67 = upgrades.filter((upgrade) => upgrade.owned >= 67).length;

  switch (achievementId) {
    case "first-click":
      return { current: totalCookieClicks, target: 1 };
    case "click-1000":
      return { current: totalCookieClicks, target: 1000 };
    case "click-10000":
      return { current: totalCookieClicks, target: 10000 };
    case "earned-500":
      return { current: totalCrashoutsEarned, target: 500 };
    case "earned-5000":
      return { current: totalCrashoutsEarned, target: 5000 };
    case "earned-100000":
      return { current: totalCrashoutsEarned, target: 100000 };
    case "earned-1000000":
      return { current: totalCrashoutsEarned, target: 1000000 };
    case "earned-10000000":
      return { current: totalCrashoutsEarned, target: 10000000 };
    case "cps-25":
      return { current: getEffectiveCps(), target: 25 };
    case "cps-1000":
      return { current: getEffectiveCps(), target: 1000 };
    case "cps-10000":
      return { current: getEffectiveCps(), target: 10000 };
    case "owned-10":
      return { current: totalOwnedUpgrades, target: 10 };
    case "owned-50":
      return { current: totalOwnedUpgrades, target: 50 };
    case "owned-100":
      return { current: totalOwnedUpgrades, target: 100 };
    case "all-upgrades":
      return { current: upgradesOwnedAtLeastOne, target: upgrades.length };
    case "owned-67-each":
      return { current: upgradesOwnedAtLeast67, target: upgrades.length };
    case "rebirth-1":
      return { current: rebirthCount, target: 1 };
    case "rebirth-3":
      return { current: rebirthCount, target: 3 };
    case "rebirth-5":
      return { current: rebirthCount, target: 5 };
    case "rebirth-10":
      return { current: rebirthCount, target: 10 };
    case "reset-once":
      return { current: permanentAchievements.has("reset-once") ? 1 : 0, target: 1 };
    case "power-5":
      return { current: totalPowerLevels, target: 5 };
    case "power-15":
      return { current: totalPowerLevels, target: 15 };
    case "power-30":
      return { current: totalPowerLevels, target: 30 };
    case "wordle-play-1":
      return { current: wordleGamesPlayed, target: 1 };
    case "wordle-loss-1":
      return { current: wordleLosses, target: 1 };
    case "wordle-loss-10":
      return { current: wordleLosses, target: 10 };
    case "wordle-win-1":
      return { current: wordleWins, target: 1 };
    case "wordle-win-10":
      return { current: wordleWins, target: 10 };
    case "wordle-win-25":
      return { current: wordleWins, target: 25 };
    case "wordle-streak-3":
      return { current: wordleBestStreak, target: 3 };
    case "wordle-streak-5":
      return { current: wordleBestStreak, target: 5 };
    case "wordle-streak-10":
      return { current: wordleBestStreak, target: 10 };
    case "wordle-fast": {
      const solvedFast = wordleBestGuessCount !== null && wordleBestGuessCount <= 3;
      return { current: solvedFast ? 1 : 0, target: 1 };
    }
    case "wordle-lightning": {
      const solvedLightning = wordleBestGuessCount !== null && wordleBestGuessCount <= 2;
      return { current: solvedLightning ? 1 : 0, target: 1 };
    }
    case "wordle-play-10":
      return { current: wordleGamesPlayed, target: 10 };
    case "wordle-play-50":
      return { current: wordleGamesPlayed, target: 50 };
    case "wordle-play-100":
      return { current: wordleGamesPlayed, target: 100 };
    default:
      return { current: 0, target: 1 };
  }
}

function renderAchievements() {
  achievementsList.innerHTML = "";

  let unlockedCount = 0;

  ACHIEVEMENTS.forEach((achievement) => {
    const unlocked = unlockedAchievements.has(achievement.id) || permanentAchievements.has(achievement.id);
    if (unlocked) {
      unlockedCount += 1;
    }

    const item = document.createElement("article");
    item.className = `achievement-item ${unlocked ? "unlocked" : "locked"}`;

    const title = document.createElement("span");
    title.className = "achievement-title";
    title.textContent = `${unlocked ? "Unlocked" : "Locked"}: ${achievement.title}`;

    const description = document.createElement("span");
    description.className = "achievement-desc";
    description.textContent = achievement.description;

    const progressData = getAchievementProgress(achievement.id);
    const progressCurrent = Math.min(
      Math.max(0, safeNumber(progressData.current)),
      Math.max(1, safeNumber(progressData.target))
    );
    const progressTarget = Math.max(1, safeNumber(progressData.target));
    const progressPercent = unlocked ? 100 : Math.round((progressCurrent / progressTarget) * 100);

    const progressWrap = document.createElement("div");
    progressWrap.className = "achievement-progress";

    const progressFill = document.createElement("div");
    progressFill.className = "achievement-progress-fill";
    progressFill.style.width = `${Math.max(0, Math.min(100, progressPercent))}%`;

    const progressText = document.createElement("span");
    progressText.className = "achievement-progress-text";
    progressText.textContent = unlocked
      ? "Completed"
      : `${formatNumber(progressCurrent)}/${formatNumber(progressTarget)}`;

    progressWrap.appendChild(progressFill);

    item.appendChild(title);
    item.appendChild(description);
    item.appendChild(progressWrap);
    item.appendChild(progressText);
    achievementsList.appendChild(item);
  });

  achievementsSummary.textContent = `${unlockedCount}/${ACHIEVEMENTS.length} unlocked`;

  const progressPercent = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);
  if (achievementsProgressFill) {
    achievementsProgressFill.style.width = `${progressPercent}%`;
    achievementsProgressFill.setAttribute("aria-valuenow", String(progressPercent));
  }

  if (achievementsProgressText) {
    achievementsProgressText.textContent = `${progressPercent}%`;
  }
}

function safeNumber(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}

function evaluateAchievements() {
  let changed = false;

  const achievementChecks = {
    "first-click": totalCookieClicks >= 1,
    "click-1000": totalCookieClicks >= 1000,
    "click-10000": totalCookieClicks >= 10000,
    "earned-500": totalCrashoutsEarned >= 500,
    "earned-5000": totalCrashoutsEarned >= 5000,
    "earned-100000": totalCrashoutsEarned >= 100000,
    "earned-1000000": totalCrashoutsEarned >= 1000000,
    "earned-10000000": totalCrashoutsEarned >= 10000000,
    "cps-25": getEffectiveCps() >= 25,
    "cps-1000": getEffectiveCps() >= 1000,
    "cps-10000": getEffectiveCps() >= 10000,
    "owned-10": getTotalOwnedUpgrades() >= 10,
    "owned-50": getTotalOwnedUpgrades() >= 50,
    "owned-100": getTotalOwnedUpgrades() >= 100,
    "all-upgrades": upgrades.every((upgrade) => upgrade.owned >= 1),
    "owned-67-each": upgrades.every((upgrade) => upgrade.owned >= 67),
    "rebirth-1": rebirthCount >= 1,
    "rebirth-3": rebirthCount >= 3,
    "rebirth-5": rebirthCount >= 5,
    "rebirth-10": rebirthCount >= 10,
    "power-5": getTotalPowerLevels() >= 5,
    "power-15": getTotalPowerLevels() >= 15,
    "power-30": getTotalPowerLevels() >= 30,
    "wordle-play-1": wordleGamesPlayed >= 1,
    "wordle-loss-1": wordleLosses >= 1,
    "wordle-loss-10": wordleLosses >= 10,
    "wordle-win-1": wordleWins >= 1,
    "wordle-win-10": wordleWins >= 10,
    "wordle-win-25": wordleWins >= 25,
    "wordle-streak-3": wordleBestStreak >= 3,
    "wordle-streak-5": wordleBestStreak >= 5,
    "wordle-streak-10": wordleBestStreak >= 10,
    "wordle-fast": wordleBestGuessCount !== null && wordleBestGuessCount <= 3,
    "wordle-lightning": wordleBestGuessCount !== null && wordleBestGuessCount <= 2,
    "wordle-play-10": wordleGamesPlayed >= 10,
    "wordle-play-50": wordleGamesPlayed >= 50,
    "wordle-play-100": wordleGamesPlayed >= 100,
  };

  ACHIEVEMENTS.forEach((achievement) => {
    if (!unlockedAchievements.has(achievement.id) && achievementChecks[achievement.id]) {
      unlockedAchievements.add(achievement.id);
      changed = true;
    }
  });

  if (changed) {
    renderAchievements();
    saveProgress();
  }
}

function pickWordleWord() {
  return WORDLE_ALL_WORDS[Math.floor(Math.random() * WORDLE_ALL_WORDS.length)];
}

function getWordleStatusPriority(status) {
  if (status === "correct") {
    return 3;
  }

  if (status === "present") {
    return 2;
  }

  if (status === "absent") {
    return 1;
  }

  return 0;
}

function renderWordleKeyboard() {
  wordleKeyboard.innerHTML = "";

  WORDLE_KEYBOARD_ROWS.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "wordle-keyboard-row";

    row.split("").forEach((letter) => {
      const key = document.createElement("span");
      key.className = "wordle-key";
      key.textContent = letter;

      const status = wordleLetterStatuses[letter];
      if (status) {
        key.classList.add(status);
      }

      rowElement.appendChild(key);
    });

    wordleKeyboard.appendChild(rowElement);
  });
}

function updateWordleKeyboardStatuses(guess, result) {
  for (let i = 0; i < guess.length; i += 1) {
    const letter = guess[i];
    const nextStatus = result[i];
    const currentStatus = wordleLetterStatuses[letter];

    if (getWordleStatusPriority(nextStatus) > getWordleStatusPriority(currentStatus)) {
      wordleLetterStatuses[letter] = nextStatus;
    }
  }

  renderWordleKeyboard();
}

function renderWordleBoard() {
  wordleBoard.innerHTML = "";

  for (let row = 0; row < WORDLE_MAX_GUESSES; row += 1) {
    const rowElement = document.createElement("div");
    rowElement.className = "wordle-row";

    const guessState = wordleGuesses[row];

    for (let col = 0; col < WORDLE_WORD_LENGTH; col += 1) {
      const tile = document.createElement("div");
      tile.className = "wordle-tile";

      if (guessState) {
        tile.textContent = guessState.guess[col].toUpperCase();
        tile.classList.add(guessState.result[col]);
      }

      rowElement.appendChild(tile);
    }

    wordleBoard.appendChild(rowElement);
  }
}

function evaluateWordleGuess(guess, target) {
  const result = new Array(WORDLE_WORD_LENGTH).fill("absent");
  const remaining = {};

  for (let i = 0; i < WORDLE_WORD_LENGTH; i += 1) {
    const t = target[i];
    const g = guess[i];

    if (g === t) {
      result[i] = "correct";
    } else {
      remaining[t] = (remaining[t] || 0) + 1;
    }
  }

  for (let i = 0; i < WORDLE_WORD_LENGTH; i += 1) {
    if (result[i] === "correct") {
      continue;
    }

    const g = guess[i];
    if (remaining[g] > 0) {
      result[i] = "present";
      remaining[g] -= 1;
    }
  }

  return result;
}

function finishWordleGame(didWin) {
  wordleGameOver = true;
  wordleGamesPlayed += 1;
  wordleInput.disabled = true;
  wordleGuessButton.disabled = true;
  newWordleButton.classList.remove("hidden");

  if (didWin) {
    wordleWins += 1;
    wordleCurrentStreak += 1;
    wordleBestStreak = Math.max(wordleBestStreak, wordleCurrentStreak);
    const guessCount = wordleGuesses.length;
    if (wordleBestGuessCount === null || guessCount < wordleBestGuessCount) {
      wordleBestGuessCount = guessCount;
    }

    const maxReward = Math.max(1, 10 * Math.floor(getEffectiveCps()));
    const reward = Math.floor(Math.random() * maxReward) + 1;
    score += reward;
    totalCrashoutsEarned += reward;

    wordleMessage.textContent = `You solved it! +${formatNumber(reward)} crashouts bonus.`;
  } else {
    wordleLosses += 1;
    wordleCurrentStreak = 0;
    wordleMessage.textContent = `Out of guesses. Word was ${wordleTarget.toUpperCase()}.`;
  }

  updateDisplay();
  evaluateAchievements();
  saveProgress();
}

function startNewWordleGame() {
  wordleTarget = pickWordleWord();
  wordleGuesses = [];
  wordleGameOver = false;
  wordleLetterStatuses = {};
  wordleMessage.textContent = "";
  wordleInput.value = "";
  wordleInput.disabled = false;
  wordleGuessButton.disabled = false;
  newWordleButton.classList.add("hidden");
  renderWordleBoard();
  renderWordleKeyboard();
}

function handleWordleSubmit(event) {
  event.preventDefault();

  if (wordleGameOver) {
    return;
  }

  const guess = wordleInput.value.trim().toLowerCase();

  if (!/^[a-z]{5}$/.test(guess)) {
    wordleMessage.textContent = "Enter exactly 5 letters.";
    return;
  }

  const result = evaluateWordleGuess(guess, wordleTarget);
  wordleGuesses.push({ guess, result });
  renderWordleBoard();
  updateWordleKeyboardStatuses(guess, result);
  wordleInput.value = "";

  if (guess === wordleTarget) {
    finishWordleGame(true);
    return;
  }

  if (wordleGuesses.length >= WORDLE_MAX_GUESSES) {
    finishWordleGame(false);
    return;
  }

  wordleMessage.textContent = `${WORDLE_MAX_GUESSES - wordleGuesses.length} guesses left.`;
}

function updateDisplay() {
  scoreElement.textContent = formatNumber(score);
  cpsElement.textContent = formatNumber(getEffectiveCps());
  wordleWinsValue.textContent = formatNumber(wordleWins);
  wordleStreakValue.textContent = formatNumber(wordleCurrentStreak);
  wordleBoostValue.textContent = `x${getWordleStreakMultiplier().toFixed(2)}`;
  rebirthInfo.textContent = `Ragequits: ${formatNumber(rebirthCount)} | Multiplier: x${formatNumber(
    getRebirthMultiplier()
  )} | Next: ${formatNumber(rebirthCost)}`;
  rebirthButton.disabled = score < rebirthCost;

  const upgradeButtons = document.querySelectorAll(".upgrade-buy-btn");
  upgradeButtons.forEach((button) => {
    const index = Number(button.dataset.index);
    const upgrade = upgrades[index];
    button.disabled = score < upgrade.cost;

    const meta = button.querySelector(".upgrade-meta");
    meta.textContent = `Cost: ${formatNumber(upgrade.cost)} | Unit: ${formatNumber(
      getUpgradeUnitCps(upgrade)
    )}/s | Owned: ${upgrade.owned}`;

    const powerButton = document.querySelector(`.upgrade-power-btn[data-index="${index}"]`);
    if (powerButton) {
      powerButton.disabled = score < upgrade.powerCost;
      powerButton.textContent = `Power Lvl ${upgrade.powerLevel} -> ${upgrade.powerLevel + 1} (Cost: ${formatNumber(
        upgrade.powerCost
      )})`;
    }
  });

  evaluateAchievements();
}

function buyUpgrade(index) {
  const upgrade = upgrades[index];
  if (score < upgrade.cost) {
    return;
  }

  score -= upgrade.cost;
  upgrade.owned += 1;
  upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
  pointsPerSecond = calculateBaseCps();

  updateDisplay();
  saveProgress();
}

function buyUpgradePower(index) {
  const upgrade = upgrades[index];
  if (score < upgrade.powerCost) {
    return;
  }

  score -= upgrade.powerCost;
  upgrade.powerLevel += 1;
  upgrade.powerCost = Math.floor(getInitialPowerCost(upgrade) * Math.pow(3, upgrade.powerLevel));
  pointsPerSecond = calculateBaseCps();

  updateDisplay();
  saveProgress();
}

function renderUpgrades() {
  upgradesList.innerHTML = "";

  upgrades.forEach((upgrade, index) => {
    const card = document.createElement("article");
    card.className = "upgrade-card";

    const button = document.createElement("button");
    button.className = "upgrade-btn upgrade-buy-btn";
    button.dataset.index = String(index);
    button.type = "button";

    const avatar = document.createElement("img");
    avatar.className = "upgrade-avatar";
    avatar.src = upgrade.image;
    avatar.alt = `${upgrade.name} avatar`;

    const textWrap = document.createElement("div");
    textWrap.className = "upgrade-text";

    const name = document.createElement("span");
    name.className = "upgrade-name";
    name.textContent = upgrade.name;

    const meta = document.createElement("span");
    meta.className = "upgrade-meta";

    textWrap.appendChild(name);
    textWrap.appendChild(meta);

    button.appendChild(avatar);
    button.appendChild(textWrap);
    button.addEventListener("click", () => buyUpgrade(index));

    const powerButton = document.createElement("button");
    powerButton.className = "upgrade-power-btn";
    powerButton.dataset.index = String(index);
    powerButton.type = "button";
    powerButton.addEventListener("click", () => buyUpgradePower(index));

    card.appendChild(button);
    card.appendChild(powerButton);

    upgradesList.appendChild(card);
  });

  updateDisplay();
}

cookieButton.addEventListener("click", () => {
  handleGamingGuyClick(true, true);
});

rebirthButton.addEventListener("click", () => {
  tryRebirth();
});

resetButton.addEventListener("click", () => {
  openResetConfirm();
});

cancelResetButton.addEventListener("click", () => {
  closeResetConfirm();
});

confirmResetButton.addEventListener("click", () => {
  resetProgress();
  closeResetConfirm();
});

confirmOverlay.addEventListener("click", (event) => {
  if (event.target === confirmOverlay) {
    closeResetConfirm();
  }
});

closeBirthdayButton.addEventListener("click", () => {
  closeBirthdayCelebration();
});

birthdayOverlay.addEventListener("click", (event) => {
  if (event.target === birthdayOverlay) {
    closeBirthdayCelebration();
  }
});

adYesButton.addEventListener("click", () => {
  startAdWatch();
});

adNoButton.addEventListener("click", () => {
  closeAdPrompt();
});

adCloseButton.addEventListener("click", () => {
  closeAdPrompt();
});

if (coinGuessHeads && coinGuessTails) {
  coinGuessHeads.addEventListener("click", () => {
    setCoinGuess("heads");
  });

  coinGuessTails.addEventListener("click", () => {
    setCoinGuess("tails");
  });
}

if (coinFlipButton) {
  coinFlipButton.addEventListener("click", () => {
    handleCoinFlip();
  });
}

if (adsToggle) {
  adsToggle.addEventListener("change", () => {
    adsEnabled = adsToggle.checked;
    saveSettings();
    applyAdsToggleState();
  });
}

adVideo.addEventListener("play", () => {
  if (!currentAdMedia || !adAudio.src) {
    return;
  }

  syncAdAudioToVideo();
  adAudio.play().catch(() => {
    // Ignore autoplay restrictions; user can press play again.
  });
});

adVideo.addEventListener("pause", () => {
  adAudio.pause();
});

adVideo.addEventListener("seeking", () => {
  syncAdAudioToVideo();
});

adVideo.addEventListener("timeupdate", () => {
  syncAdAudioToVideo();
});

adVideo.addEventListener("ended", () => {
  stopAdAudio();
  adMessage.textContent = applyRandomAdReward();
  adCloseButton.classList.remove("hidden");
});

showUpgradesTab.addEventListener("click", () => {
  setActiveSidebarTab("upgrades");
});

showAchievementsTab.addEventListener("click", () => {
  setActiveSidebarTab("achievements");
});

wordleForm.addEventListener("submit", handleWordleSubmit);

newWordleButton.addEventListener("click", () => {
  startNewWordleGame();
});

setInterval(() => {
  const passiveGain = getEffectiveCps();
  score += passiveGain;
  totalCrashoutsEarned += passiveGain;
  updateDisplay();
  saveProgress();
}, 1000);

setInterval(() => {
  maybeShowRandomAdPrompt();
}, AD_PROMPT_CHECK_MS);

updateCountdown();
setInterval(updateCountdown, 1000);
loadPermanentAchievements();
loadSettings();
loadProgress();
renderUpgrades();
renderAchievements();
setActiveSidebarTab("upgrades");
evaluateAchievements();
startNewWordleGame();
applyAdsToggleState();
setCoinGuess("heads");
updateCoinVisual(null);
