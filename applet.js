export async function run({ videoId }) {
  const API_KEY = "{{YOUTUBE_API_KEY}}";
  
  if (!videoId) {
    return "Please provide a YouTube video ID";
  }
  
  try {
    // Fetch video statistics from YouTube Data API v3
    const response = await fetch(
      `https://www.googleapis.com/youtube/data/v3/videos?id=${videoId}&part=statistics,snippet&key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return "Video not found or invalid video ID";
    }
    
    const video = data.items[0];
    const stats = video.statistics;
    const snippet = video.snippet;
    
    return `📊 **${snippet.title}**
    
👀 Views: ${parseInt(stats.viewCount).toLocaleString()}
👍 Likes: ${parseInt(stats.likeCount).toLocaleString()}
💬 Comments: ${parseInt(stats.commentCount).toLocaleString()}
📅 Published: ${new Date(snippet.publishedAt).toLocaleDateString()}`;
    
  } catch (error) {
    console.log("Error fetching YouTube data:", error);
    return "Sorry, I couldn't fetch the YouTube video data right now.";
  }
}
