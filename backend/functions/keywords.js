export default {
    archetypes: {
        developer: [
            "developer",
            "dev",
            "coder",
            "programmer",
            "software",
            "frontend",
            "backend",
            "fullstack",
            "webdev",
            "javascript",
            "typescript",
            "react",
            "node",
            "express",
            "python",
            "java",
            "c++",
            "github",
            "open source",
            "linux"
        ],

        student: [
            "student",
            "college",
            "university",
            "school",
            "btech",
            "be",
            "engineering",
            "coe",
            "cse",
            "ece",
            "iit",
            "nit",
            "iiit",
            "tiet",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029"
        ],

        photographer: [
            "photo",
            "photography",
            "photographer",
            "capture",
            "captures",
            "shots",
            "lens",
            "camera",
            "sony",
            "canon",
            "nikon"
        ],

        gamer: [
            "gamer",
            "gaming",
            "valorant",
            "cs2",
            "counter strike",
            "minecraft",
            "fortnite",
            "pubg",
            "bgmi",
            "free fire"
        ],

        gymbro: [
            "gym",
            "fitness",
            "bodybuilding",
            "workout",
            "lift",
            "zyzz",
            "protein",
            "bulk",
            "cut"
        ],

        trader: [
            "trader",
            "crypto",
            "bitcoin",
            "eth",
            "forex",
            "stocks",
            "nifty",
            "banknifty"
        ],

        influencer: [
            "creator",
            "content creator",
            "influencer",
            "collab",
            "dm for collab",
            "ugc"
        ],

        traveller: [
            "travel",
            "traveller",
            "wanderlust",
            "explore",
            "mountains",
            "beach"
        ],

        foodie: [
            "food",
            "foodie",
            "cafe",
            "coffee",
            "pizza",
            "burger"
        ],

        anime: [
            "anime",
            "otaku",
            "naruto",
            "one piece",
            "luffy",
            "gojo",
            "sukuna",
            "eren"
        ],

        sigma: [
            "sigma",
            "lone wolf",
            "mindset",
            "grind",
            "discipline"
        ]
    },

    emojis: {
        developer: ["💻", "⌨️", "🖥️"],
        gymbro: ["💪", "🏋️", "🔥"],
        sigma: ["🗿", "⚡", "🖤"],
        photographer: ["📷", "📸"],
        traveller: ["✈️", "🌍", "🏔️"],
        foodie: ["🍕", "☕", "🍔"],
        student: ["🎓", "📚"],
        gamer: ["🎮"],
        trader: ["📈", "💹", "₿"],
        heartbroken: ["💔"],
        love: ["❤️", "💕", "💖"]
    },

    usernamePatterns: {
        cringe: [
            "official",
            "real",
            "king",
            "queen",
            "badboy",
            "alone",
            "broken",
            "legend",
            "killer",
            "devil",
            "sigma"
        ],

        aesthetic: [
            "xyz",
            "xx",
            "__",
            "..",
            "07",
            "69",
            "999",
            "444"
        ]
    },

    roastFlags: {
        noFollowers: {
            condition: p => p.followers < 10
        },

        followingEveryone: {
            condition: p =>
                p.following > p.followers * 5
        },

        privateAccount: {
            condition: p => p.private
        },

        emptyBio: {
            condition: p =>
                p.bioLength === 0
        },

        noPosts: {
            condition: p =>
                p.posts === 0
        },

        tooManyPosts: {
            condition: p =>
                p.posts > 500
        },

        lowEngagement: {
            condition: p =>
                p.media.averageLikes &&
                p.media.averageLikes < 20
        },

        portfolioLink: {
            condition: p =>
                !!p.externalLink
        },

        noHighlights: {
            condition: p =>
                p.highlights === 0
        },

        ratioDisaster: {
            condition: p =>
                p.followerFollowingRatio < 0.3
        },

        celebrityComplex: {
            condition: p =>
                p.following < 100 &&
                p.followers < 200
        }
    }
};