function processProfile(responseData) {
    const user = responseData?.data?.user;

    if (!user) {
        throw new Error("Invalid Instagram response");
    }

    const posts = user.edge_owner_to_timeline_media?.edges || [];

    let imagePosts = 0;
    let videoPosts = 0;
    let carouselPosts = 0;

    let totalLikes = 0;
    let totalComments = 0;

    const recentPosts = posts.map(({ node }) => {
        let type = "image";

        switch (node.__typename) {
            case "GraphVideo":
                type = "video";
                videoPosts++;
                break;

            case "GraphSidecar":
                type = "carousel";
                carouselPosts++;
                break;

            default:
                imagePosts++;
        }

        const likes =
            node.edge_liked_by?.count ??
            node.edge_media_preview_like?.count ??
            0;

        const comments =
            node.edge_media_to_comment?.count ??
            node.edge_media_preview_comment?.count ??
            0;

        const caption =
            node.edge_media_to_caption?.edges?.[0]?.node?.text || "";

        totalLikes += likes;
        totalComments += comments;

        return {
            id: node.id,
            shortcode: node.shortcode,
            type,
            likes,
            comments,
            caption,
            timestamp: node.taken_at_timestamp,
            isVideo: node.is_video,
            isPinned: node.pinned_for_users?.length > 0
        };
    });

    const followers = user.edge_followed_by?.count || 0;
    const following = user.edge_follow?.count || 0;

    return {
        // ==========================
        // Basic Info
        // ==========================

        id: user.id,
        username: user.username,
        fullName: user.full_name || "",

        // ==========================
        // Biography
        // ==========================

        bio: user.biography || "",
        bioLength: (user.biography || "").length,

        mentions:
            user.biography_with_entities?.entities
                ?.map(e => e.user?.username)
                .filter(Boolean) || [],

        hashtags:
            user.biography?.match(/#[A-Za-z0-9_]+/g) || [],

        externalLink: user.external_url || null,
        pronouns: user.pronouns || [],

        // ==========================
        // Stats
        // ==========================

        followers,
        following,
        posts: user.edge_owner_to_timeline_media?.count || 0,
        reels: user.edge_felix_video_timeline?.count || 0,
        highlights: user.highlight_reel_count || 0,

        followerFollowingRatio:
            following === 0 ? followers : followers / following,

        // ==========================
        // Account
        // ==========================

        private: user.is_private,
        verified: user.is_verified,
        business: user.is_business_account,
        professional: user.is_professional_account,

        joinedRecently: user.is_joined_recently,
        hasGuides: user.has_guides,
        hasClips: user.has_clips,
        hasChannel: user.has_channel,

        // ==========================
        // Profile Picture
        // ==========================

        profilePic: {
            url: user.profile_pic_url_hd || user.profile_pic_url,
            custom:
                !(user.profile_pic_url || "").includes("anonymous_profile_pic")
        },

        // ==========================
        // Media
        // ==========================

        media: {
            imagePosts,
            videoPosts,
            carouselPosts,

            averageLikes:
                recentPosts.length
                    ? Math.round(totalLikes / recentPosts.length)
                    : null,

            averageComments:
                recentPosts.length
                    ? Math.round(totalComments / recentPosts.length)
                    : null,

            recentPosts
        }
    };
}

export default processProfile;