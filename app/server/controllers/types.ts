export type contentCalendarData = {
  company: string;
  desc: string;
  personas: string[];
  subReddits: string[];
  chatGptQueries: string[];
  postsPerWeek: number;
};

export type PlannedPost = {
  id: number;
  subReddit: string;
  title: string;
  body: string;
  author_username: string;
  timestamp: string;
  keyword_ids: number[];
};

export type PlannedComment = {
  id: number;
  post_id: number;
  parent_comment_id: number;
  comment_text: string;
  username: string;
  timestamp: string;
};
