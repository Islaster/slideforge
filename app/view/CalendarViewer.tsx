export default function CalendarViewer({ calendar }) {
  if (!calendar) return <p>No calendar data found.</p>;

  const { posts, comments } = calendar;

  // Group comments by post
  const grouped = posts.reduce((acc: any, post: any) => {
    acc[post.id] = comments.filter((c) => c.post_id === post.id);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <div key={post.id} className="p-6 bg-white rounded-xl border shadow-sm">
          {/* Subreddit + Title */}
          <div className="text-gray-500 text-sm mb-1">{post.subReddit}</div>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

          {/* Body */}
          <p className="text-gray-800 leading-relaxed mb-3">{post.body}</p>

          {/* Meta */}
          <div className="text-xs text-gray-400 mb-4">
            Posted by{" "}
            <span className="font-medium">{post.author_username}</span> •{" "}
            {new Date(post.timestamp).toLocaleString()}
          </div>

          {/* Comments */}
          <div className="mt-4">
            <h3 className="font-medium mb-3 text-gray-800">Comments</h3>

            {grouped[post.id].length === 0 && (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}

            {grouped[post.id].map((comment, index) => (
              <div
                key={comment.id}
                className="ml-4 pl-4 border-l-2 border-gray-200 py-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    {comment.username.trim()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                  {comment.comment_text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
