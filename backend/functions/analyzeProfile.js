import keywords from "./keywords.js";

const { archetypes, emojis, usernamePatterns, roastFlags } = keywords;

function contains(text, words) {
    text = (text || "").toLowerCase();
    return words.some(word => text.includes(word.toLowerCase()));
}

function countMatches(text, words) {
    text = (text || "").toLowerCase();

    let count = 0;

    for (const word of words) {
        if (text.includes(word.toLowerCase()))
            count++;
    }

    return count;
}

function analyzeProfile(profile) {

    const bio = (profile.bio || "").toLowerCase();
    const username = (profile.username || "").toLowerCase();
    const fullName = (profile.fullName || "").toLowerCase();

    const scores = {};
    const detectedArchetypes = [];
    const roastTargets = [];
    const personality = [];
    const vibe = [];

    // initialize scores

    for (const key in archetypes)
        scores[key] = 0;

    // -----------------------
    // Keyword scoring
    // -----------------------

    for (const type in archetypes) {

        scores[type] +=
            countMatches(bio, archetypes[type]) * 25;

        scores[type] +=
            countMatches(username, archetypes[type]) * 15;

        scores[type] +=
            countMatches(fullName, archetypes[type]) * 10;
    }

    // -----------------------
    // Emoji scoring
    // -----------------------

    for (const type in emojis) {

        for (const emoji of emojis[type]) {

            if (profile.bio.includes(emoji))
                scores[type] =
                    (scores[type] || 0) + 15;
        }
    }

    // -----------------------
    // Username analysis
    // -----------------------

    if (contains(username, usernamePatterns.cringe))
        roastTargets.push("cringeUsername");

    if (contains(username, usernamePatterns.aesthetic))
        roastTargets.push("aestheticUsername");

    if (/\d{4,}/.test(username))
        roastTargets.push("tooManyNumbers");

    if (username.length < 4)
        roastTargets.push("shortUsername");

    // -----------------------
    // Bio analysis
    // -----------------------

    if (profile.bioLength === 0)
        roastTargets.push("emptyBio");

    if (profile.bioLength < 10)
        roastTargets.push("lazyBio");

    if (profile.bioLength > 120)
        roastTargets.push("essayBio");

    if (/single|taken|relationship/i.test(profile.bio))
        roastTargets.push("relationshipStatus");

    if (/gulaam|slave|simp/i.test(profile.bio))
        roastTargets.push("simp");

    if (/broken|heart|alone|sad/i.test(profile.bio))
        roastTargets.push("heartbroken");

    // -----------------------
    // Follower analysis
    // -----------------------

    if (profile.followers < 10)
        roastTargets.push("noFollowers");

    if (profile.followers < 100)
        personality.push("small creator");

    if (profile.followers > 10000)
        personality.push("popular");

    if (profile.followers > profile.following * 5)
        personality.push("people know them");

    if (profile.following > profile.followers * 5)
        roastTargets.push("followingEveryone");

    if (profile.followerFollowingRatio < 0.25)
        roastTargets.push("ratioDisaster");

    // -----------------------
    // Posts
    // -----------------------

    if (profile.posts === 0)
        roastTargets.push("noPosts");

    if (profile.posts > 500)
        personality.push("chronically online");

    if (profile.posts < 5 && profile.followers > 500)
        personality.push("mysterious");

    // -----------------------
    // Account
    // -----------------------

    if (profile.private)
        roastTargets.push("privateAccount");

    if (profile.highlights === 0)
        roastTargets.push("noHighlights");

    if (profile.externalLink)
        personality.push("showoff");

    if (profile.business)
        personality.push("business");

    if (profile.professional)
        personality.push("professional");

    if (profile.verified)
        personality.push("verified");

    // -----------------------
    // Media
    // -----------------------

    if (profile.media.averageLikes !== null) {

        const engagement =
            profile.media.averageLikes /
            Math.max(profile.followers, 1);

        if (engagement > 0.20)
            personality.push("good engagement");

        if (engagement < 0.03)
            roastTargets.push("deadEngagement");
    }

    if (profile.media.videoPosts >
        profile.media.imagePosts)
        personality.push("reel addict");

    if (profile.media.carouselPosts >
        profile.media.imagePosts)
        personality.push("photo dumper");

    // -----------------------
    // Detect archetypes
    // -----------------------

    for (const type in scores) {

        if (scores[type] >= 25)
            detectedArchetypes.push({
                type,
                score: scores[type]
            });
    }

    detectedArchetypes.sort(
        (a, b) => b.score - a.score
    );

    // -----------------------
    // Vibes
    // -----------------------

    if (profile.private && profile.posts > 50)
        vibe.push("mysterious");

    if (profile.followers < 20 &&
        profile.following > 200)
        vibe.push("attention seeker");

    if (profile.posts === 0)
        vibe.push("ghost account");

    if (profile.bio.includes("🖤"))
        vibe.push("edgy");

    if (profile.bio.includes("💀"))
        vibe.push("gen-z");

    if (profile.bio.includes("✨"))
        vibe.push("aesthetic");

    // -----------------------
    // Generic roast flags
    // -----------------------

    for (const flag in roastFlags) {

        if (roastFlags[flag].condition(profile))
            roastTargets.push(flag);
    }

    // remove duplicates

    return {
        archetypes: [...new Map(
            detectedArchetypes.map(a => [a.type, a])
        ).values()],

        roastTargets: [...new Set(roastTargets)],

        personality: [...new Set(personality)],

        vibe: [...new Set(vibe)],

        scores
    };
}

export default analyzeProfile;