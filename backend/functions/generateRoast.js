import roastTemplates from "./roastTemplates.js";

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
}

function getRating(profile) {

    let score = 50;

    if (profile.followers > profile.following)
        score += 10;

    if (profile.followers > 1000)
        score += 10;

    if (profile.posts > 20)
        score += 5;

    if (profile.highlights > 3)
        score += 5;

    if (profile.externalLink)
        score += 5;

    if (profile.bioLength > 15)
        score += 5;

    if (profile.private)
        score -= 5;

    if (profile.followers < 50)
        score -= 10;

    if (profile.followerFollowingRatio < 0.5)
        score -= 10;

    return clamp(score, 0, 100);
}

function getCringe(profile, analysis) {

    let cringe = 0;

    cringe += analysis.roastTargets.length * 8;

    if (analysis.roastTargets.includes("simp"))
        cringe += 20;

    if (analysis.roastTargets.includes("cringeUsername"))
        cringe += 15;

    if (analysis.roastTargets.includes("followingEveryone"))
        cringe += 20;

    if (analysis.roastTargets.includes("ratioDisaster"))
        cringe += 15;

    if (analysis.roastTargets.includes("heartbroken"))
        cringe += 15;

    return clamp(cringe, 0, 100);
}

function generateSummary(profile, analysis) {

    if (
        analysis.archetypes.length === 0 &&
        analysis.roastTargets.length === 0
    )
        return "Just another NPC scrolling Instagram.";

    let parts = [];

    if (analysis.archetypes.length)
        parts.push(
            analysis.archetypes
                .slice(0, 2)
                .map(a => a.type)
                .join(" + ")
        );

    if (analysis.vibe.length)
        parts.push(analysis.vibe.join(", "));

    return parts.join(" • ");
}

function generateRoast(profile, analysis) {

    const used = new Set();

    const jokes = [];

    const targets = shuffle(analysis.roastTargets);

    for (const target of targets) {

        const list = roastTemplates[target];

        if (!list)
            continue;

        const available = list.filter(x => !used.has(x));

        if (!available.length)
            continue;

        const joke = random(available);

        jokes.push(joke);

        used.add(joke);

        if (jokes.length >= 4)
            break;
    }

    const archetypes = shuffle(
        analysis.archetypes.map(a => a.type)
    );

    for (const type of archetypes) {

        if (jokes.length >= 6)
            break;

        const list = roastTemplates[type];

        if (!list)
            continue;

        const available = list.filter(x => !used.has(x));

        if (!available.length)
            continue;

        const joke = random(available);

        jokes.push(joke);

        used.add(joke);
    }

    return {
        username: profile.username,

        title:
            analysis.archetypes[0]?.type
                ? `${analysis.archetypes[0].type.toUpperCase()} DETECTED`
                : "UNKNOWN SPECIES",

        rating: getRating(profile),

        cringe: getCringe(profile, analysis),

        summary: generateSummary(profile, analysis),

        archetypes: analysis.archetypes,

        vibe: analysis.vibe,

        personality: analysis.personality,

        roastTargets: analysis.roastTargets,

        roasts: jokes,

        verdict: jokes.join(" ")
    };
}

export default generateRoast;